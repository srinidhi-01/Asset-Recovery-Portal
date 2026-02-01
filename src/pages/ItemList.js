import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ItemList.css";

function ItemList({ items, deleteItem, user }) {
  const navigate = useNavigate();

  const [itemSearch, setItemSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter((item) => {
    const matchesItem = item.name
      .toLowerCase()
      .includes(itemSearch.toLowerCase());

    const matchesLocation = item.location
      .toLowerCase()
      .includes(locationSearch.toLowerCase());

    const matchesStatus =
      filter === "all" || item.status === filter;

    return matchesItem && matchesLocation && matchesStatus;
  });

  return (
    <>
      {/* Search + Filter */}
      <div style={{ padding: "20px", display: "flex", gap: "15px" }}>
        <input
          id="itemSearch"
          name="itemSearch"
          type="text"
          placeholder="Search item"
          value={itemSearch}
          onChange={(e) => setItemSearch(e.target.value)}
        />

        <input
          id="locationSearch"
          name="locationSearch"
          type="text"
          placeholder="Search location"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />

        <select
          id="statusFilter"
          name="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Item Cards */}
      <div className="item-grid">
        {filteredItems.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="item-card-content">
              <span className={`badge ${item.status}`}>
                {item.status.toUpperCase()}
              </span>

              <h3>{item.name}</h3>
              <p>📍 {item.location}</p>

              <button
                onClick={() => navigate(`/item/${item.id}`)}
              >
                View Details
              </button>

              {user?.role === "admin" && (
                <button
                  style={{ background: "#dc3545", marginTop: "8px" }}
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemList;
