import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, name: user.name, email: user.email, address: user.address }, token });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "All fields required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, name: user.name, email: user.email, address: user.address }, token });
  } catch (err) {
    console.error("login err:", err);
    res.status(500).json({ error: "Server error" });
  }
};
