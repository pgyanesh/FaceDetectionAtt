import axios from "axios";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = async () => {
    if (!name || !image) {
      alert("Please enter a name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image); // Make sure the key matches 'image' exactly

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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
