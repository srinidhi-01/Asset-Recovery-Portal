import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ItemDetails.css";

function ItemDetails({ items, user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = items.find((i) => i.id === Number(id));

  if (!item) {
    return <h2 style={{ padding: "20px" }}>Item not found</h2>;
  }

  const handleClaim = () => {
    if (!user) {
      alert("Please login to claim this item");
      navigate("/login");
      return;
    }

    alert("Claim request sent successfully!");
  };

  return (
    <div className="details-container">
      <img
        src={item.image}
        alt={item.name}
        className="details-image"
      />

      <div className="details-content">
        <span className={`details-badge ${item.status}`}>
          {item.status.toUpperCase()}
        </span>

        <h2>{item.name}</h2>
        <p><strong>Location:</strong> {item.location}</p>

        <p><strong>Contact:</strong> Available after claim</p>

        <button className="claim-btn" onClick={handleClaim}>
          Claim Item
        </button>
      </div>
    </div>
  );
}

export default ItemDetails;
