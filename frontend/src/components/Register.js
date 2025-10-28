import React, { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "",address:"", remember: false });
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/register", {
        name: form.name, email: form.email, password: form.password, address: form.address
      });
      login(res.data.user, res.data.token, form.remember);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="container" style={{maxWidth: 480}}>
      <h3>Register</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Name</label>
          <input required name="name" value={form.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input required type="password" name="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-2">
          <label>Address</label>
          <input required type="text"  name="address" value={form.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="remember" onChange={handleChange} />
          <label className="form-check-label">Remember me</label>
        </div>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
