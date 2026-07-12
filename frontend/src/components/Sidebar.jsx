import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../services/auth";
import { getMyChannels, getSubscriptions } from "../services/channels";
import "../styles/sidebar.css";

function Sidebar({ onClose }) {
  const loggedInUser = getUser();
  const location = useLocation();
  const [myChannels, setMyChannels] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Load only subscribed channels + my channels
  useEffect(() => {
    const loadData = async () => {
      const user = getUser();

      if (!user) {
        setSubscriptions([]);
        setMyChannels([]);
        return;
      }

      try {
        // Only channels this user subscribed to
        const subs = await getSubscriptions();
        setSubscriptions(subs || []);

        const mine = await getMyChannels();
        setMyChannels(mine || []);
      } catch (error) {
        setSubscriptions([]);
        setMyChannels([]);
      }
    };

    loadData();
  }, [location.pathname]);

  // Show only first 6 subscriptions
  const visibleSubs = subscriptions.slice(0, 6);
  const hasMoreSubs = subscriptions.length > 6;

  const getLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <button className="menu-btn" type="button" onClick={onClose}>
          ☰
        </button>
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <img
            src="/yt_logo_fullcolor_white_digital.png"
            alt="YouTube"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="sidebar-scroll">
        <Link to="/" className="sidebar-item" onClick={handleLinkClick}>
          <span className="sidebar-icon">🏠</span> Home
        </Link>
        <div className="sidebar-item muted">
          <span className="sidebar-icon">🎬</span> Shorts
        </div>

        <div className="sidebar-divider"></div>

        <p className="sidebar-section">Subscriptions</p>

        {!loggedInUser ? (
          <p className="sidebar-empty">Sign in to see subscriptions.</p>
        ) : visibleSubs.length === 0 ? (
          <p className="sidebar-empty">No subscriptions yet.</p>
        ) : (
          visibleSubs.map((channel) => (
            <Link
              key={channel._id}
              to={`/channel/${channel._id}`}
              className="sidebar-item sub-item"
              onClick={handleLinkClick}
            >
              <span className="sub-avatar">{getLetter(channel.channelName)}</span>
              <span className="sub-name">{channel.channelName}</span>
            </Link>
          ))
        )}

        {loggedInUser && (
          <Link
            to="/subscriptions"
            className="sidebar-item"
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">▼</span> Show more
          </Link>
        )}

        <div className="sidebar-divider"></div>

        <p className="sidebar-section">You</p>

        {loggedInUser && myChannels.length > 0 ? (
          <Link
            to={`/channel/${myChannels[0]._id}`}
            className="sidebar-item"
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">👤</span> Your channel
          </Link>
        ) : (
          <Link
            to={loggedInUser ? "/create-channel" : "/login"}
            className="sidebar-item"
            onClick={handleLinkClick}
          >
            <span className="sidebar-icon">👤</span> Your channel
          </Link>
        )}

        <div className="sidebar-item muted">
          <span className="sidebar-icon">🕒</span> History
        </div>
        <div className="sidebar-item muted">
          <span className="sidebar-icon">📃</span> Playlists
        </div>
        <div className="sidebar-item muted">
          <span className="sidebar-icon">⏰</span> Watch Later
        </div>
        <div className="sidebar-item muted">
          <span className="sidebar-icon">👍</span> Liked videos
        </div>
        <div className="sidebar-item muted">
          <span className="sidebar-icon">🎥</span> Your videos
        </div>

        {loggedInUser && myChannels.length === 0 && (
          <>
            <div className="sidebar-divider"></div>
            <p className="sidebar-empty">Create your first channel.</p>
            <Link
              to="/create-channel"
              className="sidebar-item"
              onClick={handleLinkClick}
            >
              <span className="sidebar-icon">➕</span> Create Channel
            </Link>
          </>
        )}

        {!loggedInUser && (
          <>
            <div className="sidebar-divider"></div>
            <Link to="/login" className="sidebar-item" onClick={handleLinkClick}>
              <span className="sidebar-icon">🔑</span> Sign In
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
