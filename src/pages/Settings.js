import React from "react";
import "../styles/Settings.css";

function Settings({ user, theme, setTheme }) {
  if (!user) {
    return <h2 style={{ padding: "20px" }}>Please login to view settings</h2>;
  }

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* PROFILE SECTION */}
      <div className="settings-card">
        <h3>Profile</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* THEME SECTION */}
      <div className="settings-card">
        <h3>Theme</h3>

        <button
          className={theme === "light" ? "active" : ""}
          onClick={() => setTheme("light")}
        >
          🌞 Light Mode
        </button>

        <button
          className={theme === "dark" ? "active" : ""}
          onClick={() => setTheme("dark")}
        >
          🌙 Dark Mode
        </button>
      </div>
    </div>
  );
}

export default Settings;
