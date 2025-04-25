import React, { useState } from "react";
import "../pages/Register.css";
import HeroSection from "../components/HeroSection";
import axiosInstance from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "", // 👈 new role field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        ...form,
        phone: form.phone || "+1-314-555-0000", // default demo
      });

      alert("✅ " + response.data.message);
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <>
      <HeroSection />
      <div className="register-page">
        <h2>Register</h2>
        <div className="auth-page">
          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            {/* ✅ Add Role Dropdown */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              style={{ marginBottom: "1rem", padding: "10px", borderRadius: "5px" }}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
