import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const products = [
  { name: 'Running Shoes', price: 2999, image: '/image/shoe.jpeg', category: 'Fashion', inStock: true },
  { name: 'Cotton T-Shirt', price: 799, image: '/image/shirt.jpg', category: 'Fashion', inStock: true },
  { name: 'Bluetooth Speaker', price: 3499, image: '/image/speaker.jpg', category: 'Electronics', inStock: true },
  { name: 'Gaming Laptop', price: 75000, image: '/image/laptop.webp', category: 'Electronics', inStock: true },
  { name: 'iPhone 15 Pro', price: 134900, image: '/image/iphone.webp', category: 'Electronics', inStock: true },
  { name: 'Mechanical Keyboard', price: 4500, image: '/image/keyboard.jpg', category: 'Electronics', inStock: true },
  { name: 'Wireless Mouse', price: 1899, image: '/image/mouse.jpg', category: 'Electronics', inStock: true },
  { name: 'Steel Water Bottle', price: 599, image: '/image/waterbottle.jpg', category: 'Lifestyle', inStock: true }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();