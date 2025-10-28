import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import img1 from "../images/product1.jpeg";
import img2 from "../images/product2.jpeg";
import img3 from "../images/product3.jpeg";
const imageMap = { "product1.jpeg": img1, "product2.jpeg": img2, "product3.jpeg": img3 };

const Cart = () => {
  const { cart, updateItem, total } = useContext(CartContext);
  if (!cart || !cart.items || cart.items.length===0) return <div className="container mt-4"><h4>Your cart is empty</h4></div>;

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      <div className="list-group">
        {cart.items.map((it) => {
  const p = it.product;
  if (!p) return null; // null product ko skip karo taaki crash na ho

  const final = (p.price || 0) - ((p.price || 0) * (p.offer || 0)) / 100;
  const src = imageMap[p.image] || img1;

  return (
    <div
      className="list-group-item d-flex align-items-center justify-content-between"
      key={p._id}
    >
      <div className="d-flex align-items-center">
        <img
          src={src}
          alt={p.name}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            marginRight: 15,
            borderRadius: 8,
          }}
        />
        <div>
          <h5>{p.name}</h5>
          <p className="mb-1 text-muted">{p.description}</p>
          <small>₹{final.toFixed(2)}</small>
        </div>
      </div>
      <div style={{ minWidth: 180 }}>
        <div className="d-flex align-items-center justify-content-end">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => updateItem(p._id, it.quantity - 1)}
          >
            -
          </button>
          <span>{it.quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => updateItem(p._id, it.quantity + 1)}
          >
            +
          </button>
          <button
            className="btn btn-sm btn-danger ms-3"
            onClick={() => updateItem(p._id, 0)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
})}

      </div>
      <div className="mt-3"><h4>Total: ₹{total.toFixed(2)}</h4></div>
    </div>
  );
};
export default Cart;
