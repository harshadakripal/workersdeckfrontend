import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Services.css';
import HeroSection from '../components/HeroSection';

const serviceImages = {
  painting: "/images/painting.png",
  plumbing: "/images/plumbing.jpeg",
  electrician: "/images/electrician.jpg",
  cleaning: "/images/Cleaning.jpg", // Use exact capitalization from your assets
};

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Failed to fetch services:', err));
  }, []);

  const handleBook = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    } else {
      navigate(`/services/${id}`);
    }
  };

  return (
    <>
      <HeroSection />
      <div className="services-page">
        <h2>Our Services</h2>
        <p>Browse our professional services below and book the one that suits your needs!</p>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <img
                src={serviceImages[service.name.toLowerCase()] || "/images/gardening.jpg"}
                alt={service.name}
                className="service-image"
              />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              {service.category && <p><strong>Category:</strong> {service.category}</p>}
              <p><strong>Price:</strong> ${service.price}</p>
              <button onClick={() => handleBook(service.id)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;