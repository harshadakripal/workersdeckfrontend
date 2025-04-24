import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    booking_date: "",
    booking_time: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  const bgImages = {
    painting: "/images/services/painting-bg.jpg",
    cleaning: "/images/services/cleaning-bg.jpg",
    electrician: "/images/services/electrician-bg.jpg",
    plumbing: "/images/services/plumbing-bg.jpg",
    gardening: "/images/services/gardening-bg.jpg"
  };

  useEffect(() => {
    axios.get(`/services/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => {
        console.error("Error loading service:", err);
        setMessage("❌ Service not found");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await axios.post("/book", { ...form, service_id: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(` ${res.data.message}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || "Booking failed"}`);
    }
  };

  const backgroundImage = service ? bgImages[service.name.toLowerCase()] : "";

  return (
    <div
      className="service-bg-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="service-details-container">
        {service ? (
          <>
            <h2 className="service-title">{service.name}</h2>
            <p className="service-description">{service.description}</p>

            <form onSubmit={handleBooking} className="booking-form">
              <label>
                Booking Date:
                <input type="date" name="booking_date" value={form.booking_date} onChange={handleChange} required />
              </label>
              <label>
                Booking Time:
                <input type="time" name="booking_time" value={form.booking_time} onChange={handleChange} required />
              </label>
              <label>
                Address:
                <textarea
                  name="address"
                  placeholder="Enter the service location"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" className="book-btn">Confirm Booking</button>
              {message && <p className="response-message">{message}</p>}
            </form>
          </>
        ) : (
          <p className="loading-text">Loading service details...</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
