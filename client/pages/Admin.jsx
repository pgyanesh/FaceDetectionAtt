import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/register">Register Student</Link><br />
      <Link to="/admin/sheet">View Attendance Sheet</Link>
    </div>
  );
}

export default AdminDashboard;
