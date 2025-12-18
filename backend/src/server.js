import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';

// CORS Configuration
const corsOptions = {
  origin: isProduction ? true : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes (unchanged)
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Production: Serve React build files
if (isProduction) {
  // Serve static files from Vite build
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Handle React Router - serve index.html for non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
} else {
  // Development: Only serve API status
  app.get('/', (req, res) => {
    res.json({ message: 'JZ Shop Backend Running - Development Mode' });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - ${isProduction ? 'Production' : 'Development'} mode`);
});