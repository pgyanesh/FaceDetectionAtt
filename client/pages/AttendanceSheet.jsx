import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceSheet.css"; // Import the CSS

const AttendanceSheet = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/attendance");

        if (Array.isArray(res.data)) {
          setData(res.data);
          const grouped = groupByWeek(res.data);
          setGroupedData(grouped);
        } else {
          setError("Unexpected data format received from server.");
        }
      } catch (err) {
        setError("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const groupByWeek = (entries) => {
    const currentWeekStart = new Date();
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    const grouped = {};

    entries.forEach((entry) => {
      const date = new Date(entry.Date);
      if (date >= currentWeekStart && date <= currentWeekEnd) {
        if (!grouped[entry.Name]) grouped[entry.Name] = [];
        grouped[entry.Name].push(entry);
      }
    });

    return grouped;
  };

  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sheet-container">
      <h2 className="sheet-heading">Weekly Attendance Summary</h2>
      <div className="cards-container">
        {Object.entries(groupedData).map(([name, records], index) => (
          <div key={index} className="card">
            <h3>{name}</h3>
            <p><strong>Logins this week:</strong> {records.length}</p>
            <ul>
              {records.map((rec, i) => (
                <li key={i}>
                  {rec.Date} at {rec.Time}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSheet;
