import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideoById, likeVideo, dislikeVideo, getVideos } from "../services/videos";
import { getUser } from "../services/auth";
import {
  checkSubscription,
  subscribeChannel,
  unsubscribeChannel,
} from "../services/channels";
import Comments from "../components/Comments";
import "../styles/videoPlayer.css";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playError, setPlayError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeChip, setActiveChip] = useState("All");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // Category chips for right side
  const chips = ["All", "Music", "Gaming", "News", "Coding", "Sports", "Education"];

  // Load video from backend
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setPlayError(false);
        setIsSubscribed(false);
        const data = await getVideoById(id);
        setVideo(data);

        // Check if user already subscribed (stays after refresh)
        if (getUser() && data.channelId) {
          try {
            const result = await checkSubscription(data.channelId);
            setIsSubscribed(result.subscribed);
          } catch (err) {
            setIsSubscribed(false);
          }
        }
      } catch (err) {
        setError("Video not found");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  // Load suggested videos for right sidebar
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await getVideos("", activeChip);
        // Remove current video from suggestions
        const filtered = data.filter((item) => item._id !== id);
        setSuggestions(filtered);
      } catch (err) {
        setSuggestions([]);
      }
    };

    loadSuggestions();
  }, [id, activeChip]);

  // Handle like button
  const handleLike = async () => {
    try {
      const updated = await likeVideo(id);
      setVideo(updated);
    } catch (err) {
      // Ignore like errors for now
    }
  };

  // Handle dislike button
  const handleDislike = async () => {
    try {
      const updated = await dislikeVideo(id);
      setVideo(updated);
    } catch (err) {
      // Ignore dislike errors for now
    }
  };

  // Toggle subscribe / unsubscribe and keep button state
  const handleSubscribe = async () => {
    if (!getUser()) {
      navigate("/login");
      return;
    }

    if (!video?.channelId || subLoading) {
      return;
    }

    try {
      setSubLoading(true);

      if (isSubscribed) {
        await unsubscribeChannel(video.channelId);
        setIsSubscribed(false);
      } else {
        await subscribeChannel(video.channelId);
        setIsSubscribed(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Could not update subscription");
    } finally {
      setSubLoading(false);
    }
  };

  // Check if URL is a YouTube link
  const getYoutubeEmbedUrl = (url) => {
    if (!url) {
      return null;
    }

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="simple-page">
        <p>Loading video...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="simple-page">
        <h1>Video not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const youtubeEmbed = getYoutubeEmbedUrl(video.videoUrl);
  const channelLetter = video.channelName
    ? video.channelName.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="watch-page">
      {/* Left side - player and details */}
      <div className="watch-main">
        <div className="player-container">
          {!video.videoUrl && (
            <p className="player-error">No video URL provided.</p>
          )}

          {youtubeEmbed && (
            <iframe
              className="player-video player-iframe"
              src={youtubeEmbed}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          {video.videoUrl && !youtubeEmbed && (
            <video
              key={video._id + video.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="player-video"
              src={video.videoUrl}
              onError={() => setPlayError(true)}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {playError && (
            <p className="player-error">
              Could not play this video. Try /videos/sample1.mp4 or a YouTube
              link.
            </p>
          )}
        </div>

        <h1 className="player-title">{video.title}</h1>

        {/* Channel row + like dislike pills */}
        <div className="watch-actions-row">
          <div className="watch-channel-block">
            <div className="channel-avatar-circle">{channelLetter}</div>
            <div>
              {video.channelId ? (
                <Link
                  to={`/channel/${video.channelId}`}
                  className="player-channel"
                >
                  {video.channelName}
                </Link>
              ) : (
                <p className="player-channel">{video.channelName}</p>
              )}
              <p className="channel-sub-text">{video.views} views</p>
            </div>
            <button
              type="button"
              className={`subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
              onClick={handleSubscribe}
              disabled={subLoading}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="like-dislike-group">
            <button className="pill-btn" onClick={handleLike} type="button">
              👍 {video.likes}
            </button>
            <button className="pill-btn" onClick={handleDislike} type="button">
              👎 {video.dislikes}
            </button>
            <button className="pill-btn" type="button">
              Share
            </button>
            <button className="pill-btn" type="button">
              Save
            </button>
          </div>
        </div>

        {/* Description box */}
        <div className="description-box">
          <p className="description-meta">
            {video.views} views · {video.category}
          </p>
          <p className="player-description-text">{video.description}</p>
        </div>

        <Comments videoId={id} />
      </div>

      {/* Right side - category chips + suggested videos */}
      <aside className="watch-sidebar">
        <div className="suggest-chips">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`suggest-chip ${activeChip === chip ? "active" : ""}`}
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="suggest-list">
          {suggestions.length === 0 ? (
            <p className="suggest-empty">No suggestions.</p>
          ) : (
            suggestions.map((item) => (
              <Link
                key={item._id}
                to={`/video/${item._id}`}
                className="suggest-item"
              >
                <img
                  className="suggest-thumb"
                  src={item.thumbnailUrl || "https://picsum.photos/168/94"}
                  alt={item.title}
                />
                <div className="suggest-info">
                  <h4 className="suggest-title">{item.title}</h4>
                  <p className="suggest-meta">{item.channelName}</p>
                  <p className="suggest-meta">{item.views} views</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default VideoPlayer;
