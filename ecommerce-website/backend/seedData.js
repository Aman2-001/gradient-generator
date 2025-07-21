import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@ecomstore.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user'
  }
];

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    brand: 'AudioTech',
    stock: 50,
    featured: true,
    ratings: { average: 4.5, count: 128 },
    tags: ['wireless', 'bluetooth', 'headphones', 'audio']
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop'
    ],
    category: 'clothing',
    brand: 'EcoWear',
    stock: 100,
    featured: true,
    ratings: { average: 4.2, count: 89 },
    tags: ['organic', 'cotton', 'sustainable', 'casual']
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Stay connected and track your fitness goals.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    brand: 'TechTime',
    stock: 30,
    featured: true,
    ratings: { average: 4.7, count: 203 },
    tags: ['smartwatch', 'fitness', 'health', 'technology']
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Premium non-slip yoga mat made from eco-friendly materials. Perfect for all types of yoga and exercise.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506629905607-c51524350ed0?w=500&h=500&fit=crop'
    ],
    category: 'sports',
    brand: 'ZenFit',
    stock: 75,
    featured: false,
    ratings: { average: 4.3, count: 67 },
    tags: ['yoga', 'exercise', 'fitness', 'eco-friendly']
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe. Wake up to fresh coffee every morning.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop'
    ],
    category: 'home',
    brand: 'BrewMaster',
    stock: 25,
    featured: true,
    ratings: { average: 4.4, count: 156 },
    tags: ['coffee', 'kitchen', 'appliance', 'programmable']
  },
  {
    name: 'Running Shoes Elite',
    description: 'Professional running shoes with advanced cushioning and breathable mesh upper. Designed for serious runners.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop'
    ],
    category: 'sports',
    brand: 'RunFast',
    stock: 60,
    featured: false,
    ratings: { average: 4.6, count: 94 },
    tags: ['running', 'shoes', 'sports', 'athletic']
  },
  {
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle. Improve your workspace comfort.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop'
    ],
    category: 'electronics',
    brand: 'WorkSpace',
    stock: 40,
    featured: false,
    ratings: { average: 4.1, count: 78 },
    tags: ['laptop', 'stand', 'ergonomic', 'workspace']
  },
  {
    name: 'Skincare Set Premium',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Suitable for all skin types.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0d?w=500&h=500&fit=crop'
    ],
    category: 'beauty',
    brand: 'GlowSkin',
    stock: 35,
    featured: true,
    ratings: { average: 4.8, count: 112 },
    tags: ['skincare', 'beauty', 'moisturizer', 'routine']
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data...');

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} products`);

    console.log('✅ Data seeded successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Admin: admin@ecomstore.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeder
seedData();