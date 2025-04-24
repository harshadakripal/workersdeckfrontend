import React, { useState, useEffect } from "react";
import "./BackgroundSlideshow.css";

const BackgroundSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = ["slide1", "slide2", "slide3"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="background-slideshow">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`slide ${slide} ${index === currentSlide ? "active" : ""}`}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundSlideshow;