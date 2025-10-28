import React, { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import local images
import img1 from "../images/product1.jpeg";
import img2 from "../images/product2.jpeg";
import img3 from "../images/product3.jpeg";
import img4 from "../images/product4.webp";
import img5 from "../images/product5.webp";
import img6 from "../images/product6.jpg";

const imageMap = { "product1.jpeg": img1, "product2.jpeg": img2, "product3.jpeg": img3, "product4.webp": img4, "product5.webp": img5,"product6.jpg": img6};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { (async()=>{ try{ const res = await api.get("/products");
      console.log("Products API response:", res.data); // 👈 yahan likho
    setProducts(res.data); }catch(e){console.error(e);} })(); }, []);

  const handleAdd = (id) => { if (!user) return navigate("/login"); addToCart(id, 1); };

  return (
    <div className="container mt-3">
      <div className="row">
        {products.map((p, idx) => {
          const final = p.price - (p.price * (p.offer || 0))/100;
          const src = imageMap[p.image] || img1;
          return (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100">
                <img src={src} alt={p.name} className="card-img-top" style={{height:220,objectFit:'cover'}}/>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">{p.description}</p>
                  <div className="mt-auto">
                    <div className="mb-1"><small className="text-muted">₹{p.price}</small></div>
                    <div className="mb-2"><strong>₹{final.toFixed(2)}</strong></div>
                    {p.offer>0 && <div className="text-success mb-2">{p.offer}% off</div>}
                    <button className="btn btn-secondary w-100" onClick={()=>handleAdd(p._id)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  );
};
export default ProductList;
