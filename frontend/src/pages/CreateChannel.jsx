import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getUser } from "../services/auth";
import "../styles/channel.css";

function CreateChannel() {
  const { channels, setChannels } = useOutletContext();
  const navigate = useNavigate();
  const loggedInUser = getUser();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  // Show message if user is not logged in
  if (!loggedInUser) {
    return (
      <div className="simple-page">
        <p>Please login to create a channel.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // Create new channel and go to channel page
  const handleCreate = () => {
    if (channelName.trim() === "") {
      return;
    }

    const newChannel = {
      id: Date.now().toString(),
      name: channelName,
      description: description,
      banner: bannerUrl || "https://picsum.photos/1200/200?random=99",
      subscribers: "0",
    };

    setChannels([...channels, newChannel]);
    navigate(`/channel/${newChannel.id}`);
  };

  return (
    <div className="channel-form-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="channel-form-box">
        <h1>Create Channel</h1>

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

          <button type="button" className="channel-form-btn" onClick={handleCreate}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
