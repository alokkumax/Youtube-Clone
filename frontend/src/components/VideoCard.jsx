import { Link } from "react-router-dom";

// Reusable video card component
function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.id}`} className="video-card">
      <img
        className="video-thumbnail"
        src={video.thumbnail}
        alt={video.title}
      />
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channelName}</p>
        <p className="video-views">{video.views}</p>
      </div>
    </Link>
  );
}

export default VideoCard;
