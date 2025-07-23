import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../src/assets/finalLogo.png"; // Adjust path if needed

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home2");
  };

  return (
    <div className="homeContainer">
      <header className="homeHeader">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="mainContent">
        <h1 className="mainTitle">Seamless Face Recognition</h1>
        <p className="subTitle">Advanced. Secure. Instant.</p>

        <div className="laserWrapper">
          <button className="inspoButton" onClick={handleStart}>
            <span className="inspoButtonText">Explore</span>
            <div className="rotatingBorder"></div>
            <div className="laserLine"></div>
          </button>
        </div>
      </main>

      <footer className="footer">
        © 2025 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
