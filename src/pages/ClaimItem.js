import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function ClaimItem({ items }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = items.find((i) => i.id === Number(id));
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  if (!item) return <h2>Item not found</h2>;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !contact || !message) {
      alert("Fill all fields");
      return;
    }
    const claim = {
      itemId: item.id,
      itemName: item.name,
      name,
      contact,
      message,
      date: new Date().toISOString()
    };
    
    const existingClaims =
      JSON.parse(localStorage.getItem("claims")) ||  [];

    localStorage.setItem(
      "claims",
      JSON.stringify([claim, ...existingClaims])
    );

    alert("Claim submitted successfully!");
    navigate("/");
  };
  return (
    <div className="auth-container">
      <h2>Claim: {item.name}</h2>

      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Contact (Phone / Email)</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <label>Why is this yours?</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Submit Claim</button>
      </form>
    </div>
  );
}

export default ClaimItem;
