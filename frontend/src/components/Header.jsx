import { Link } from "react-router-dom";
import "../styles/header.css";

function Header({ onMenuClick, searchQuery, onSearchChange }) {
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
        <Link to="/login" className="sign-in-btn">
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
