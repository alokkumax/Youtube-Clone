import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getVideoById, likeVideo, dislikeVideo } from "../services/videos";
import Comments from "../components/Comments";
import "../styles/videoPlayer.css";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playError, setPlayError] = useState(false);

  // Load video from backend
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setPlayError(false);
        const data = await getVideoById(id);
        setVideo(data);
      } catch (err) {
        setError("Video not found");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

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

  return (
    <div className="video-player-page">
      <div className="player-container">
        {!video.videoUrl && (
          <p className="player-error">No video URL provided.</p>
        )}

        {/* YouTube videos use iframe */}
        {youtubeEmbed && (
          <iframe
            className="player-video player-iframe"
            src={youtubeEmbed}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {/* Normal MP4 videos use video tag */}
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
            Could not play this video. Try using a local file like
            /videos/sample1.mp4 or a YouTube link.
          </p>
        )}
      </div>

      <h1 className="player-title">{video.title}</h1>

      <div className="player-stats">
        <span>{video.views} views</span>
        <span>{video.likes} likes</span>
        <span>{video.dislikes} dislikes</span>
      </div>

      {/* Like and Dislike buttons */}
      <div className="like-dislike-btns">
        <button className="like-btn" onClick={handleLike}>
          Like
        </button>
        <button className="dislike-btn" onClick={handleDislike}>
          Dislike
        </button>
      </div>

      {video.channelId && (
        <Link to={`/channel/${video.channelId}`} className="player-channel">
          {video.channelName}
        </Link>
      )}

      {!video.channelId && (
        <p className="player-channel">{video.channelName}</p>
      )}

      <p className="player-description">{video.description}</p>

      <Comments videoId={id} />
    </div>
  );
}

export default VideoPlayer;
