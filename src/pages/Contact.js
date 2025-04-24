import React from "react";
import "../pages/Contact.css";
import HeroSection from "../components/HeroSection";

const Contact = () => {
  return (
    <><HeroSection/>
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>Email: support@workersdeck.com</p>
      <p>Phone: +1 317 701 1234</p>
      <p>Address: St. Louis, Missouri, USA</p>
    </div>
    </>
  );
};
export default Contact;