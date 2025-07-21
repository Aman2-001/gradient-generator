import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's cart
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/add', authenticate, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if item already exists in cart
    const existingItem = user.cart.find(item => 
      item.product.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/update', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const user = await User.findById(req.user.id);
    const cartItem = user.cart.find(item => 
      item.product.toString() === productId
    );
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      user.cart = user.cart.filter(item => 
        item.product.toString() !== productId
      );
    } else {
      cartItem.quantity = quantity;
    }
    
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => 
      item.product.toString() !== productId
    );
    
    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear cart
router.delete('/clear', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;