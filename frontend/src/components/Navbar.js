import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const itemsCount = cart?.items?.filter(it => it.product !== null)
                               ?.reduce((s, it) => s + it.quantity, 0) || 0;


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Online Shopping</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/cart">Cart ({itemsCount})</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item me-3 nav-link">Hi, {user.name}</li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-success" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
