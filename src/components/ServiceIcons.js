import React from "react";
import "./ServiceIcons.css";

const services = [
  { name: "PAINTER", icon: "/images/painter.png" },
  { name: "PLUMBER", icon: "/images/plumber.png" },
  { name: "ELECTRICIAN", icon: "/images/electrician.png" }
  { name: "CLEANER", icon: "/images/Cleaning.jpg" },
  ];

const ServiceIcons = () => {
  return (
    <div className="service-icons">
      {services.map((service, index) => (
        <div key={index} className="icon-card">
          <img src={service.icon} alt={service.name} />
          <p>{service.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceIcons;