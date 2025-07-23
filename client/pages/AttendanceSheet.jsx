import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceSheet.css";

const AttendanceSheet = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/attendance");
        console.log("Fetched attendance data:", res.data);

        if (Array.isArray(res.data)) {
          setData(res.data);
          const grouped = groupByWeek(res.data);
          console.log("Grouped by week:", grouped);
          setGroupedData(grouped);
        } else {
          setError("Unexpected data format received from server.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

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
      const date = new Date(entry.Date + "T00:00:00"); // Ensure valid parsing

      if (date >= startOfWeek && date <= endOfWeek) {
        if (!grouped[entry.Name]) grouped[entry.Name] = [];
        grouped[entry.Name].push(entry);
      }
    });

    return grouped;
  };

  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="sheet-container">
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
