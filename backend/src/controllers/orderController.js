import Order from '../models/Order.js';
import Product from '../models/Product.js';

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    console.log('📦 Order request received:', JSON.stringify(req.body, null, 2));
    
    const { products, items, customer, total, totalAmount } = req.body;
    
    // Handle both frontend formats: products array or items array
    let orderProducts = products || items;
    let orderTotal = totalAmount || total;
    
    if (!orderProducts || orderProducts.length === 0) {
      console.log('❌ No products found in request');
      return res.status(400).json({ message: 'No products in order' });
    }
    
    // Get all products from database to map frontend IDs to MongoDB ObjectIds
    const allProducts = await Product.find({});
    const productMap = {};
    allProducts.forEach((product, index) => {
      productMap[String(index + 1)] = product._id; // Map '1' -> ObjectId, '2' -> ObjectId, etc.
    });
    
    console.log('🗺️ Product ID mapping:', productMap);
    
    // Convert frontend cart format to backend format with proper ObjectIds
    const formattedProducts = [];
    for (const item of orderProducts) {
      const frontendId = item.id || item.productId;
      const mongoId = productMap[String(frontendId)];
      
      if (!mongoId) {
        console.log(`❌ Product not found for ID: ${frontendId}`);
        return res.status(400).json({ message: `Product with ID ${frontendId} not found` });
      }
      
      formattedProducts.push({
        productId: mongoId,
        quantity: item.qty || item.quantity || 1,
        price: item.price,
        name: item.title || item.name
      });
    }
    
    // Calculate total if not provided
    if (!orderTotal) {
      orderTotal = orderProducts.reduce((sum, item) => 
        sum + (item.price * (item.qty || item.quantity || 1)), 0
      );
    }
    
    console.log('✅ Formatted products:', formattedProducts);
    console.log('💰 Total amount:', orderTotal);
    
    const order = await Order.create({
      products: formattedProducts,
      totalAmount: orderTotal,
      status: 'Pending'
    });

    console.log('🎉 Order created successfully:', order._id);
    
    res.status(201).json({
      success: true,
      orderId: order._id,
      message: 'Order placed successfully',
      order: order
    });
  } catch (error) {
    console.error('❌ Order creation failed:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
