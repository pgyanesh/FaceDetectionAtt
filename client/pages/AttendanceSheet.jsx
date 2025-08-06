import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceSheet.css";
import logo from "../src/assets/nie.png";

const AttendanceSheet = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Moved this up so it's available when useEffect runs
  const groupByWeek = (entries) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const grouped = {};

    entries.forEach((entry) => {
      // Defensive check to avoid crash on bad data
      if (!entry.Date || !entry.Name || !entry.Time) return;

      const date = new Date(entry.Date + "T00:00:00");

      if (date >= startOfWeek && date <= endOfWeek) {
        if (!grouped[entry.Name]) grouped[entry.Name] = [];
        grouped[entry.Name].push(entry);
      }
    });

    return grouped;
  };

  useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/attendance");
      console.log("Fetched data:", res.data);
      setData(res.data);

      const grouped = groupByWeek(res.data);
      console.log("Grouped data:", grouped);
      setGroupedData(grouped); // ✅ Add this line!
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError("Failed to fetch attendance data");
    } finally {
      setLoading(false);
    }
  };

  fetchAttendance();
}, []);


  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p className="error-text">{error}</p>;
  const goHome = () => {
    navigate("/")
  };
  return (
    <div className="sheet-container">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo"  onClick={goHome}/>
            </header>
            </div>
      <h2 className="sheet-heading">Weekly Attendance Summary</h2>
      <div className="cards-container">
        {Object.entries(groupedData).length === 0 ? (
          <p>No attendance records found for this week.</p>
        ) : (
          Object.entries(groupedData).map(([name, records], index) => (
            <div key={index} className="card">
              <h3>{name}</h3>
              <p>
                <strong>Logins this week:</strong> {records.length}
              </p>
              <ul>
                {records.map((rec, i) => (
                  <li key={i}>
                    {rec.Date} at {rec.Time}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceSheet;
