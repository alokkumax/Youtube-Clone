import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser } from "../services/auth";
import { getMyChannels } from "../services/channels";
import "../styles/sidebar.css";

function Sidebar() {
  const loggedInUser = getUser();
  const location = useLocation();
  const [myChannels, setMyChannels] = useState([]);

  // Load my channels when page changes
  useEffect(() => {
    const loadMyChannels = async () => {
      const user = getUser();
      if (!user) {
        setMyChannels([]);
        return;
      }

      try {
        const channels = await getMyChannels();
        setMyChannels(channels);
      } catch (error) {
        setMyChannels([]);
      }
    };

    loadMyChannels();
  }, [location.pathname]);

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-item">
        Home
      </Link>

      {/* Show user's channels */}
      {loggedInUser && myChannels.length > 0 && (
        <>
          <p className="sidebar-section">My Channels</p>
          {myChannels.map((channel) => (
            <Link
              key={channel._id}
              to={`/channel/${channel._id}`}
              className="sidebar-item"
            >
              {channel.channelName}
            </Link>
          ))}
        </>
      )}

      {/* Show create channel message if logged in with no channel */}
      {loggedInUser && myChannels.length === 0 && (
        <>
          <p className="sidebar-empty">Create your first channel.</p>
          <Link to="/create-channel" className="sidebar-item">
            Create Channel
          </Link>
        </>
      )}

      {!loggedInUser && (
        <Link to="/login" className="sidebar-item">
          Sign In
        </Link>
      )}
    </aside>
  );
}

export default Sidebar;
