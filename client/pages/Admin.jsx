import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function Admin() {
  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h2>Welcome, Admin</h2>
        <p className="admin-subtitle">Manage student attendance with ease</p>
        <div className="admin-actions">
          <Link to="/admin/register" className="admin-button">📋 Register Student</Link>
          <Link to="/admin/sheet" className="admin-button">📊 View Attendance Sheet</Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
