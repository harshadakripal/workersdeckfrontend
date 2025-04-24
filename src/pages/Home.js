import React from "react";
import "../styles.css";
import "./Home.css";
import HeroSection from "../components/HeroSection";
import BackgroundSlideshow from "../components/BackgroundSlideshow";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BackgroundSlideshow />

      {/* Why Workers Deck Section */}
      <section className="why-section container py-5">
        <h2 className="text-center mb-4">Why Choose WorkersDeck?</h2>
        <div className="why-container">
          {/* Left: Features */}
          <div className="why-features">
            <div className="why-feature">
              <img src="/images/pricing-icon.webp" alt="Transparent Pricing" />
              <div>
                <h4>Transparent Pricing</h4>
                <p>See fixed prices before you book. No hidden charges.</p>
              </div>
            </div>

            <div className="why-feature">
              <img src="/images/expert-icon.webp" alt="Experts Only" />
              <div>
                <h4>Experts Only</h4>
                <p>Our professionals are well trained and have on-job expertise.</p>
              </div>
            </div>

            <div className="why-feature">
              <img src="/images/equipped-icon.webp" alt="Fully Equipped" />
              <div>
                <h4>Fully Equipped</h4>
                <p>We bring everything needed to get the job done well.</p>
              </div>
            </div>

            <div className="why-right-card">
            <img src="/images/quality-icon.webp" alt="Quality Assured" />
            <h3>100% Quality Assured</h3>
            <p>If you don’t love our service, we will make it right.</p>
          </div>
          </div>

          {/* Right: Quality Assured */}
         
        </div>
      </section>
    </div>
  );
};

export default Home;
