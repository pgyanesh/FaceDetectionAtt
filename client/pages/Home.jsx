import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../src/assets/nie.png"; // Adjust path if needed


const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home2");
  };

  const goHome = () => {
    navigate("/")
  };
  return (
    <div className="homeContainer">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo" onClick={goHome} />
            </header>
            </div>

      <main className="mainContent">
        <h1 className="mainTitle">National Institute of Engineering</h1>
        <p className="subTitle">Smart Face Detection Attendance System for Seamless Student Monitoring</p>

        <div className="laserWrapper">
          <button className="inspoButton" onClick={handleStart}>
            <span className="inspoButtonText">Get Started</span>
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
