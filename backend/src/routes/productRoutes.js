import express from "express";
import Product from "../models/Product.js";
import {
  getProducts,
  getProductById,
  createProduct
} from "../controllers/productController.js";

const router = express.Router();

// MAIN ROUTES
router.route("/")
  .get(getProducts)
  .post(createProduct);

router.route("/:id")
  .get(getProductById);

// 🔥 TEMP SEED ROUTE (ADD THIS)
router.get("/seed/data", async (req, res) => {
  await Product.deleteMany();

  const products = [
    {
      name: "Shoe",
      price: 50,
      image: "/image/shoe.jpeg",
      category: "Fashion"
    },
    {
      name: "Shirt",
      price: 399,
      image: "/image/shirt.jpg",
      category: "Fashion"
    },
    {
      name: "Speaker",
      price: 999,
      image: "/image/speaker.jpg",
      category: "Electronics"
    },
    {
      name: "Laptop",
      price: 50000,
      image: "/image/laptop.webp",
      category: "Electronics"
    }
  ];

  await Product.insertMany(products);
  res.json({ message: "Products seeded successfully" });
});

export default router;
