import React from "react";
import "./LaserButton.css";

const LaserButton = () => {
  return (
    <div className="laser-button-container">
      <div className="laser-button">
        <span className="laser-text">Get Started</span>
        <div className="glow-stripe"></div>
      </div>
    </div>
  );
};

export default LaserButton;
