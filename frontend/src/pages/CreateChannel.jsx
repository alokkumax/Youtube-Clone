import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/auth";
import { createChannel } from "../services/channels";
import "../styles/channel.css";

function CreateChannel() {
  const navigate = useNavigate();
  const loggedInUser = getUser();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [error, setError] = useState("");

  // Show message if user is not logged in
  if (!loggedInUser) {
    return (
      <div className="simple-page">
        <p>Please login to create a channel.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // Create channel using backend API
  const handleCreate = async () => {
    if (channelName.trim() === "") {
      setError("Channel name is required");
      return;
    }

    try {
      setError("");
      const newChannel = await createChannel({
        channelName,
        description,
        banner: bannerUrl || "https://picsum.photos/1200/200?random=99",
      });

      navigate(`/channel/${newChannel._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
    }
  };

  return (
    <div className="channel-form-page">
      <div className="channel-form-box">
        <h1>Create Channel</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="channel-form">
          <label htmlFor="channelName">Channel Name</label>
          <input
            type="text"
            id="channelName"
            placeholder="Enter channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter channel description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="bannerUrl">Banner URL</label>
          <input
            type="text"
            id="bannerUrl"
            placeholder="Enter banner image URL"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
          />

          <button
            type="button"
            className="channel-form-btn"
            onClick={handleCreate}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
