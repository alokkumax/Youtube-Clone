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

  // Handle logout button click
  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Hamburger button to toggle sidebar */}
        <button className="menu-btn" onClick={onMenuClick}>
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
        />
        <button className="search-btn">Search</button>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="welcome-text">Welcome {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
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
