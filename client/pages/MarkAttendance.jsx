import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import logo from "../src/assets/nie.png";
import './MarkAttendance.css';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState('');

  const captureAndSend = async () => {
  try {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");

    const res = await axios.post("http://localhost:5000/mark", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Server response:", res.data);
    setMessage(res.data.message);
  } catch (err) {
    console.error("Attendance marking failed:", err);
    setMessage("Error marking attendance.");
  }
};
const goHome = () => {
    navigate("/")
  };


  return (
    <div className="mark-main">
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo" onClick={goHome} />
            </header>
            </div>
      <h2 className="mark-heading">Mark Attendance</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mark-webcam"
      />
      <button className="mark-button" onClick={captureAndSend}>Capture & Mark</button>
      {message && <p className="mark-message">{message}</p>}
    </div>
  );
};

export default MarkAttendance;
