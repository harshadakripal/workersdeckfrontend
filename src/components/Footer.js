import React from "react";
import "../styles.css"; // ✅ already includes .footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Worker’s Deck. All rights reserved.</p>
    </footer>
  );
};

export default Footer;