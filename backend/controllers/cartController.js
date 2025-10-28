import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    // 🧹 Filter out items with null products
    cart.items = cart.items.filter(it => it.product !== null);

    // Optional: Save cleaned cart to DB
    await cart.save();
    res.json(cart);
  } catch (err) { res.status(500).json({ error: "Server error" }); }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [{ product: product._id, quantity }] });
    else {
      const idx = cart.items.findIndex(it => it.product.toString() === productId);
      if (idx > -1) cart.items[idx].quantity += quantity;
      else cart.items.push({ product: product._id, quantity });
      await cart.save();
    }
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).json({ error: "Server error" }); }
};

export const updateItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    const idx = cart.items.findIndex(it => it.product.toString() === productId);
    if (idx === -1) return res.status(404).json({ error: "Item not in cart" });
    if (quantity <= 0) cart.items.splice(idx, 1); else cart.items[idx].quantity = quantity;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) { res.status(500).json({ error: "Server error" }); }
};
