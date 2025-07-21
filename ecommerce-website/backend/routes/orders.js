import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create new order
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, shippingFee = 0, tax = 0 } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    
    // Verify all products exist and have sufficient stock
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}` 
        });
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]
      });
      
      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }
    
    totalAmount += shippingFee + tax;
    
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      shippingFee,
      tax
    });
    
    await order.save();
    
    // Clear user's cart
    const user = await User.findById(req.user.id);
    user.cart = [];
    user.orders.push(order._id);
    await user.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's orders
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { orderStatus, trackingNumber, estimatedDelivery } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.orderStatus = orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;
    
    if (orderStatus === 'delivered') {
      order.deliveredAt = new Date();
    }
    
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Can only cancel pending or confirmed orders
    if (!['pending', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }
    
    order.orderStatus = 'cancelled';
    
    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;