import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/auth";
import { getSubscriptions } from "../services/channels";
import "../styles/subscriptions.css";

function Subscriptions() {
  const loggedInUser = getUser();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load only subscribed channels
  useEffect(() => {
    const loadChannels = async () => {
      if (!getUser()) {
        setChannels([]);
        setLoading(false);
        return;
      }

      try {
        const data = await getSubscriptions();
        setChannels(data || []);
      } catch (error) {
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };

    loadChannels();
  }, []);

  const getLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  if (!loggedInUser) {
    return (
      <div className="subscriptions-page">
        <h1 className="subscriptions-title">Subscriptions</h1>
        <p className="subscriptions-empty">Please login to see subscriptions.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="subscriptions-page">
      <h1 className="subscriptions-title">Subscriptions</h1>
      <p className="subscriptions-subtitle">Channels you subscribed to</p>

      {loading ? (
        <p className="subscriptions-empty">Loading...</p>
      ) : channels.length === 0 ? (
        <p className="subscriptions-empty">
          No subscriptions yet. Open a channel and click Subscribe.
        </p>
      ) : (
        <div className="subscriptions-list">
          {channels.map((channel) => (
            <Link
              key={channel._id}
              to={`/channel/${channel._id}`}
              className="subscription-card"
            >
              <div className="subscription-avatar">
                {getLetter(channel.channelName)}
              </div>
              <div className="subscription-info">
                <h3>{channel.channelName}</h3>
                <p>{channel.subscribers || 0} subscribers</p>
                <p className="subscription-desc">
                  {channel.description || "No description"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
