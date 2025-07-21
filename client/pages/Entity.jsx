import React from 'react';
import { Link } from 'react-router-dom';

function Entity() {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <Link to="/student/mark">Mark Attendance</Link><br />
      <Link to="/student/sheet">View Attendance Sheet</Link>
    </div>
  );
}

export default Entity;
