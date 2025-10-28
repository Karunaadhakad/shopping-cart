import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });
  useEffect(() => {
    const load = async () => {
      try { if (!user) { setCart({ items: [] }); return; } const res = await api.get("/cart"); setCart(res.data); } catch (err) { console.error("Load cart:", err.response?.data || err.message); }
    };
    load();
  }, [user]);

   console.log("Cart Data:", cart);
  const addToCart = async (productId, qty=1) => { 
    try { 
      const res = await api.post("/cart/add", { productId, quantity: qty });
       setCart(res.data); } catch (err) { console.error(err.response?.data || err.message); } 
      };
  const updateItem = async (productId, quantity) => {
     try {
       const res = await api.post("/cart/update", { productId, quantity }); 
       setCart(res.data); 
      } catch (err) { 
        console.error(err.response?.data || err.message);
       } };
  const total = cart.items.reduce((s, it) => {
  if (!it.product) return s; // product null hai to skip kar do
  const price = it.product.price || 0;
  const off = it.product.offer || 0;
  const final = price - (price * off) / 100;
  return s + final * it.quantity;
}, 0);

  return <CartContext.Provider value={{ cart, addToCart, updateItem, total }}>{children}</CartContext.Provider>
};
