import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from "../src/assets/nie.png";

function Admin() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/")
  };
  return (
    <div className="admin-dashboard">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo" onClick={goHome} />
            </header>
            </div>
      <div className="admin-container">
        <h2>Welcome, Admin</h2>
        <p className="admin-subtitle">Manage student attendance with ease</p>
        <div className="admin-actions">
          <Link to="/admin/register" className="admin-button">📋 Register Student</Link>
          <Link to="/admin/sheet" className="admin-button">📊 View Attendance Sheet</Link>
          <Link to="/admin/full-attendance" className="admin-button">📘 View Full Attendance Book</Link>

        </div>
      </div>
    </div>
  );
}

export default Admin;
