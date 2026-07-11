// Reusable video card component
function VideoCard({ video }) {
  return (
    <div className="video-card">
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
    </div>
  );
}

export default VideoCard;
