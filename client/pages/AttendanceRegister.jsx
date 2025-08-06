import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceRegister.css";
import logo from "../src/assets/nie.png";

const AttendanceRegister = () => {
  const [data, setData] = useState([]);
  const [attendanceTable, setAttendanceTable] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/attendance");

        if (Array.isArray(res.data)) {
          setData(res.data);

          const namesSet = new Set();
          const datesSet = new Set();
          const table = {};

          res.data.forEach((entry) => {
            const name = entry.Name;
            const date = entry.Date;

            namesSet.add(name);
            datesSet.add(date);

            if (!table[name]) table[name] = {};
            table[name][date] = "✅"; // Mark present
          });

          const sortedDates = Array.from(datesSet).sort(
            (a, b) => new Date(a) - new Date(b)
          );

          setAttendanceTable(table);
          setAllDates(sortedDates);
        } else {
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("Failed to fetch attendance.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p>Loading attendance register...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const goHome = () => {
    navigate("/")
  };
  return (
    <div className="register-container">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo" onClick={goHome} />
            </header>
            </div>
      <h2 className="register-heading">Student Attendance Register</h2>
      <div className="table-wrapper">
        <table className="register-table">
          <thead>
            <tr>
              <th>Name</th>
              {allDates.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendanceTable).map(([name, records], i) => (
              <tr key={i}>
                <td>{name}</td>
                {allDates.map((date, j) => (
                  <td key={j}>{records[date] || "❌"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRegister;
