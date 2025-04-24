import React from "react";
import "../pages/NotFound.css";
import HeroSection from "../components/HeroSection";
import BackgroundSlideshow from "../components/BackgroundSlideshow";

const NotFound = () => {
  return (
    <><HeroSection/>
    <BackgroundSlideshow/>
    <div className="notfound-page">
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
    </>
  );
};

export default NotFound;