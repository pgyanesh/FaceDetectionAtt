import axios from "axios";
import { useState, useRef } from "react";

function Register() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // File or Blob
  const [useCamera, setUseCamera] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Could not access the camera.");
    }
  };

  // Capture image from webcam
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  };

  const handleRegister = async () => {
    if (!name || !image) {
      alert("Please enter a name and select or capture an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image); // Blob or File

    try {
      const res = await axios.post("http://localhost:5000/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div style={{ margin: "10px 0" }}>
        <button onClick={startCamera}>Use Camera</button>
        <span style={{ margin: "0 10px" }}>or</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setUseCamera(false);
            setImage(e.target.files[0]);
          }}
        />
      </div>

      {useCamera && (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: "300px" }} />
          <br />
          <button onClick={captureImage}>Capture Photo</button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
