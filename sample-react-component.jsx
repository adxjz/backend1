// Sample React Component - Copy to your frontend
import { useState, useEffect } from 'react';

// Import the API functions (adjust path as needed)
import { getProducts, createProduct, createOrder } from './api-integration';

function JZShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  // Add a new product
  const addProduct = async () => {
    const newProduct = {
      name: "Sample Product",
      price: 29.99,
      description: "A great product",
      category: "Electronics",
      image: "https://via.placeholder.com/300",
      inStock: true
    };
    
    const created = await createProduct(newProduct);
    if (created) {
      loadProducts(); // Refresh the list
    }
  };

  // Create an order
  const buyProduct = async (productId) => {
    const orderData = {
      products: [{ productId, quantity: 1 }],
      totalAmount: 29.99,
      status: "Pending"
    };
    
    const order = await createOrder(orderData);
    if (order) {
      alert('Order created successfully!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>JZ Shop</h1>
      
      <button onClick={addProduct} style={{ marginBottom: '20px' }}>
        Add Sample Product
      </button>
      
      {products.length === 0 ? (
        <p>No products available. Click "Add Sample Product" to get started!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
              <button onClick={() => buyProduct(product._id)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JZShop;