import express from "express";
import { getCart, addToCart, updateItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/update", protect, updateItem);
export default router;
