import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './MarkAttendance.css';

const MarkAttendance = () => {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState('');

  const captureAndSend = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await (await fetch(imageSrc)).blob();

      const formData = new FormData();
      formData.append('image', blob);

      const response = await axios.post("http://localhost:5000/mark", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === "success") {
        setMessage("✅ Attendance marked successfully");
      } else {
        setMessage("❌ Failed to mark attendance");
      }
    } catch (error) {
      console.error("Attendance marking failed:", error);
      setMessage("❌ Error: Attendance marking failed");
    }
  };

  return (
    <div className="mark-main">
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
