import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

const products = [
  { name: "Red Shirt", description: "Comfort cotton shirt", price: 499, offer: 10, image: "product4.webp" },
  { name: "Blue Jeans", description: "Denim jeans", price: 999, offer: 15, image: "product2.jpeg" },
  { name: "Sneakers", description: "Sport sneakers", price: 1499, offer: 5, image: "product6.jpg" },
  { name: "Backpack", description: "Travel backpack", price: 799, offer: 0, image: "product1.jpeg" },
  { name: "Wrist Watch", description: "Analog watch", price: 1999, offer: 20, image: "product5.webp" },
  { name: "Sunglasses", description: "UV protection", price: 599, offer: 10, image: "product3.jpeg" },
  { name: "Jacket", description: "Winter jacket", price: 2499, offer: 25, image: "product1.jpeg" },
  { name: "Hat", description: "Cool hat", price: 199, offer: 0, image: "product2.jpeg" },
  { name: "T-shirt", description: "Casual tee", price: 299, offer: 5, image: "product3.jpeg" },
  { name: "Shorts", description: "Summer shorts", price: 349, offer: 0, image: "product1.jpeg" },
  { name: "Headphones", description: "Over-ear", price: 1299, offer: 15, image: "product2.jpeg" },
  { name: "Charger", description: "Fast charger", price: 399, offer: 0, image: "product3.jpeg" },
  { name: "Phone Case", description: "Shockproof", price: 249, offer: 5, image: "product1.jpeg" },
  { name: "Mug", description: "Coffee mug", price: 149, offer: 0, image: "product2.jpeg" },
  { name: "Notebook", description: "A5 notebook", price: 99, offer: 0, image: "product3.jpeg" }
];

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products with images");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
