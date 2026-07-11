import { useParams, Link, useOutletContext } from "react-router-dom";
import { videos } from "../services/videos";
import { getUser } from "../services/auth";
import VideoCard from "../components/VideoCard";
import "../styles/channel.css";
import "../styles/home.css";

function Channel() {
  const { id } = useParams();
  const { channels, uploadedVideos, setUploadedVideos } = useOutletContext();
  const loggedInUser = getUser();

  // Find channel using id from URL
  const channel = channels.find((item) => item.id === id);

  if (!channel) {
    return (
      <div className="simple-page">
        <h1>Channel not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Get sample videos that belong to this channel
  const sampleChannelVideos = videos.filter(
    (video) => video.channelName === channel.name
  );

  // Get uploaded videos that belong to this channel
  const channelUploadedVideos = uploadedVideos.filter(
    (video) => video.channelId === id
  );

  // Combine all videos for this channel
  const allChannelVideos = [...sampleChannelVideos, ...channelUploadedVideos];
  const totalVideos = allChannelVideos.length;

  // Edit uploaded video title using prompt()
  const handleEditVideo = (video) => {
    const newTitle = prompt("Enter new video title:", video.title);

    // If user cancels prompt, do nothing
    if (newTitle === null) {
      return;
    }

    // If empty text, do nothing
    if (newTitle.trim() === "") {
      return;
    }

    const updatedVideos = uploadedVideos.map((item) => {
      if (item.id === video.id) {
        return { ...item, title: newTitle };
      }
      return item;
    });

    setUploadedVideos(updatedVideos);
  };

  // Delete uploaded video from the array
  const handleDeleteVideo = (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");

    if (!confirmDelete) {
      return;
    }

    const updatedVideos = uploadedVideos.filter((item) => item.id !== videoId);
    setUploadedVideos(updatedVideos);
  };

  // Check if a video was uploaded by the user (has channelId)
  const isUploadedVideo = (video) => {
    return video.channelId !== undefined;
  };

  return (
    <div className="channel-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      {/* Channel banner */}
      <img
        className="channel-banner"
        src={channel.banner}
        alt={`${channel.name} banner`}
      />

      {/* Channel information */}
      <div className="channel-info">
        <h1 className="channel-name">{channel.name}</h1>
        <p className="channel-description">{channel.description}</p>
        <p className="channel-stats">
          {channel.subscribers} subscribers · {totalVideos} videos
        </p>

        {/* Show upload link if user is logged in */}
        {loggedInUser && (
          <Link to={`/upload-video/${id}`} className="upload-link">
            Upload Video
          </Link>
        )}
      </div>

      {/* Videos belonging to this channel */}
      <h2 className="channel-videos-title">Videos</h2>

      {totalVideos === 0 ? (
        <p className="no-channel-videos">No videos on this channel yet.</p>
      ) : (
        <div className="video-grid">
          {allChannelVideos.map((video) => (
            <div key={video.id} className="channel-video-item">
              <VideoCard video={video} />

              {/* Edit and Delete only for uploaded videos */}
              {isUploadedVideo(video) && (
                <div className="video-actions">
                  <button
                    className="edit-video-btn"
                    onClick={() => handleEditVideo(video)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-video-btn"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Channel;
