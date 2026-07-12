import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../services/auth";
import { getChannelById } from "../services/channels";
import { createVideo } from "../services/videos";
import "../styles/channel.css";

function UploadVideo() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = getUser();

  const [channel, setChannel] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Coding");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load channel info
  useEffect(() => {
    const loadChannel = async () => {
      try {
        const data = await getChannelById(channelId);
        setChannel(data.channel);
      } catch (err) {
        setError("Channel not found");
      } finally {
        setLoading(false);
      }
    };

    loadChannel();
  }, [channelId]);

  if (!loggedInUser) {
    return (
      <div className="simple-page">
        <p>Please login to upload a video.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="simple-page">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="simple-page">
        <h1>Channel not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Upload video using backend API
  const handleUpload = async () => {
    if (title.trim() === "" || videoUrl.trim() === "") {
      setError("Title and Video URL are required");
      return;
    }

    try {
      setError("");
      await createVideo({
        title,
        description,
        category,
        thumbnailUrl: thumbnailUrl || "https://picsum.photos/320/180?random=50",
        videoUrl,
        channelId,
      });

      navigate(`/channel/${channelId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload video");
    }
  };

  return (
    <div className="channel-form-page">
      <div className="channel-form-box">
        <h1>Upload Video</h1>
        <p className="upload-channel-name">Channel: {channel.channelName}</p>

        {error && <p className="auth-error">{error}</p>}

        <form className="channel-form">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="videoDescription">Description</label>
          <textarea
            id="videoDescription"
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="News">News</option>
            <option value="Coding">Coding</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>

          <label htmlFor="thumbnailUrl">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnailUrl"
            placeholder="Enter thumbnail image URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />

          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="text"
            id="videoUrl"
            placeholder="Enter video URL (mp4 link)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <p className="upload-hint">
            Use: /videos/sample1.mp4 or /videos/sample2.mp4 or a YouTube link
          </p>

          <button
            type="button"
            className="channel-form-btn"
            onClick={handleUpload}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
