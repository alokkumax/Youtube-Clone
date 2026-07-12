import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../services/auth";
import "../styles/header.css";

function Header({ onMenuClick, searchQuery, onSearchChange }) {
  const [user, setUser] = useState(null);

  // Check if user is logged in when page loads
  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);
  }, []);

  // Handle logout - reload so sidebar updates too
  const handleLogout = () => {
    logoutUser();
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Hamburger button to toggle sidebar */}
        <button className="menu-btn" onClick={onMenuClick} type="button">
          ☰
        </button>
        <Link to="/" className="logo">
          <img
            src="/youtube-logo-icon.png"
            alt="YouTube"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchChange(searchQuery);
            }
          }}
        />
        <button
          type="button"
          className="search-btn"
          onClick={() => onSearchChange(searchQuery)}
        >
          Search
        </button>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="welcome-text">Welcome {user.username}</span>
            <button className="logout-btn" onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="sign-in-btn">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
