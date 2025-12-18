// JZ Shop API Integration - index.js
const API_BASE_URL = 'http://localhost:5000/api';

// Products API
const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

// Orders API
const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Export all functions
export {
  getProducts,
  getProductById,
  createProduct,
  createOrder,
  getOrders
};