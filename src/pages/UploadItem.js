import React, { useState } from "react";
import "../styles/Auth.css";

function UploadItem({ addItem }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !status || !location || !image) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      status,
      location,
      image
    };

    addItem(newItem);

    setName("");
    setStatus("");
    setLocation("");
    setImage("");

    alert("Item uploaded successfully!");
  };

  return (
    <div className="auth-container">
      <h2>Upload Item</h2>

      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          id="itemName"
          name="itemName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <label>Location</label>
        <input
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {image && (
          <img
            src={image}
            alt="preview"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "6px"
            }}
          />
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadItem;
