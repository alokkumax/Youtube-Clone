import { useParams, Link } from "react-router-dom";
import { videos } from "../services/videos";
import "../styles/videoPlayer.css";

function VideoPlayer() {
  const { id } = useParams();

  // Find the video that matches the id from URL
  const video = videos.find((item) => item.id === id);

  // Show message if video is not found
  if (!video) {
    return (
      <div className="simple-page">
        <h1>Video not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="player-container">
        <video controls className="player-video" src={video.videoUrl}>
          Your browser does not support the video tag.
        </video>
      </div>

      <h1 className="player-title">{video.title}</h1>

      <div className="player-stats">
        <span>{video.views}</span>
        <span>{video.likes} likes</span>
        <span>{video.dislikes} dislikes</span>
      </div>

      <p className="player-channel">{video.channelName}</p>

      <p className="player-description">{video.description}</p>
    </div>
  );
}

export default VideoPlayer;
