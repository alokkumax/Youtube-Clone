import { Link } from "react-router-dom";

// Reusable video card component
function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="video-card">
      <img
        className="video-thumbnail"
        src={video.thumbnailUrl || "https://picsum.photos/320/180"}
        alt={video.title}
      />
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channelName}</p>
        <p className="video-views">{video.views} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;
