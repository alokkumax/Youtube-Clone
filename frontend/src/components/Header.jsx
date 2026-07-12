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

  // First letter of username for avatar
  const avatarLetter = user ? user.username.charAt(0).toUpperCase() : "";

  return (
    <header className="header">
      <div className="header-left">
        {/* Hamburger button to open sidebar drawer */}
        <button className="menu-btn" onClick={onMenuClick} type="button">
          ☰
        </button>
        <Link to="/" className="logo">
          <img
            src="/yt_logo_fullcolor_white_digital.png"
            alt="YouTube"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="header-center">
        <div className="search-box">
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
            🔍
          </button>
        </div>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <Link to="/create-channel" className="create-btn">
              + Create
            </Link>
            <span className="welcome-text">{user.username}</span>
            <div className="user-avatar" title={user.username}>
              {avatarLetter}
            </div>
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
