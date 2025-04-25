import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";
import HeroSection from "../components/HeroSection";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", form);
      const { token, user } = response.data;

      login(token, user); // store in context
      localStorage.setItem("token", token); // store token in localStorage

      alert("✅ Login successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "❌ Login failed. Please try again.");
    }
  };

  return (
    <>
      <HeroSection />
      <div className="login-page">
        <h2>Login</h2>
        <div className="auth-page">
          <form className="login-form" onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </div>
        <p style={{ marginTop: '10px' }}>
          <a href="/forgot-password" style={{ color: '#007bff', textDecoration: 'underline' }}>
            Forgot Password?
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;