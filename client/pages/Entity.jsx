import React from 'react';
import { Link } from 'react-router-dom';
import './Entity.css'; // Importing the CSS
import logo from "../src/assets/nie.png";
import { useNavigate } from 'react-router-dom';

function Entity() {
  const navigate = useNavigate();
   const goHome = () => {
    navigate("/")
  };
  return (
    <div className="entity-dashboard">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo" onClick={goHome} />
            </header>
            </div>
      <div className="entity-container">
        <h2>Student Dashboard</h2>
        <div className="entity-actions">
          <Link to="/student/mark" className="entity-button">Mark Attendance</Link><br />
          <Link to="/student/sheet" className="entity-button">View Attendance Sheet</Link>
        </div>
      </div>
    </div>
  );
}

export default Entity;
