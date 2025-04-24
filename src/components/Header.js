import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo">WORKERS DECK</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact Us</Link>

        {auth.token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="user-greeting">Hi, {auth.user?.name} 👋</span>
            <button onClick={handleLogout} className="btn logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/register" className="btn register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;