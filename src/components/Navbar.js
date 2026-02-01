import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ user, logout, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false); // close dropdown after change
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="logo">Asset Portal</div>

      {/* RIGHT */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/stories">Stories</Link>

        {user && <Link to="/upload">Upload</Link>}

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <div className="profile-menu">
            <button
              className="nav-user"
              onClick={() => setOpen(!open)}
            >
              {user.name || user.email} ⌄
            </button>

            {open && (
              <div className="dropdown">
                <Link to="/settings" onClick={() => setOpen(false)}>
                  Settings
                </Link>

                <button className="theme-btn" onClick={toggleTheme}>
                  Theme: {theme === "dark" ? "Dark" : "Light"}
                </button>

                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
