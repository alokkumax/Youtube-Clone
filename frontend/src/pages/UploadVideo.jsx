import { useState } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { getUser } from "../services/auth";
import "../styles/channel.css";

function UploadVideo() {
  const { channelId } = useParams();
  const { channels, uploadedVideos, setUploadedVideos } = useOutletContext();
  const navigate = useNavigate();
  const loggedInUser = getUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const channel = channels.find((item) => item.id === channelId);

  if (!loggedInUser) {
    return (
      <div className="simple-page">
        <p>Please login to upload a video.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="simple-page">
        <h1>Channel not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Add new video to uploaded videos list
  const handleUpload = () => {
    if (title.trim() === "") {
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      channelId: channelId,
      title: title,
      description: description,
      category: category,
      thumbnail: thumbnailUrl || "https://picsum.photos/320/180?random=50",
      videoUrl: videoUrl,
      channelName: channel.name,
      views: "0 views",
      likes: "0",
      dislikes: "0",
    };

    setUploadedVideos([...uploadedVideos, newVideo]);
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="channel-form-page">
      <Link to={`/channel/${channelId}`} className="back-link">
        ← Back to Channel
      </Link>

      <div className="channel-form-box">
        <h1>Upload Video</h1>
        <p className="upload-channel-name">Channel: {channel.name}</p>

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
            <option value="All">All</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="News">News</option>
            <option value="Coding">Coding</option>
            <option value="Sports">Sports</option>
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
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <button type="button" className="channel-form-btn" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
