import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import axiosInstance from "../api/axios";
import "./ForgotPassword.css"; // Add this for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      console.log(res.data.token);
      setMessage(`✅ Password reset link sent (token): ${res.data.token}`);
    } catch (error) {
      console.error(error);
      setError("❌ Unable to send reset link. Please try again later.");
    }
  };

  return (
    <>
      <HeroSection />
      <div className="forgot-wrapper">
        <div className="forgot-box">
          <h2 className="forgot-title">Forgot Your Password?</h2>
          <p className="forgot-subtext">We’ll email you a link to reset it.</p>
          <form className="forgot-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" className="forgot-btn">Send Reset Link</button>
          </form>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;