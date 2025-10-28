import React, { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../css/login.css';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email: form.email, password: form.password });
      login(res.data.user, res.data.token, form.remember);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow p-4">
        <h3 className="text-center mb-3">Welcome Back 👋</h3>
        <p className="text-center text-muted mb-4">Login to continue shopping</p>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="remember"
              onChange={handleChange}
            />
            <label className="form-check-label">Remember me</label>
          </div>
          <button className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
