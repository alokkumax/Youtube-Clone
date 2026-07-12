import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../services/auth";
import { getChannelById } from "../services/channels";
import { updateVideo, deleteVideo } from "../services/videos";
import VideoCard from "../components/VideoCard";
import "../styles/channel.css";
import "../styles/home.css";

function Channel() {
  const { id } = useParams();
  const loggedInUser = getUser();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load channel from backend
  const loadChannel = async () => {
    try {
      setLoading(true);
      const data = await getChannelById(id);
      setChannel(data.channel);
      setVideos(data.videos);
      setOwner(data.owner);
    } catch (err) {
      setError("Channel not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannel();
  }, [id]);

  // Edit video title using prompt and API
  const handleEditVideo = async (video) => {
    const newTitle = prompt("Enter new video title:", video.title);

    if (newTitle === null || newTitle.trim() === "") {
      return;
    }

    try {
      await updateVideo(video._id, { title: newTitle });
      loadChannel();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to edit video");
    }
  };

  // Delete video using API
  const handleDeleteVideo = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteVideo(videoId);
      loadChannel();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete video");
    }
  };

  // Check if current user owns this channel
  const isOwner =
    loggedInUser && owner && String(loggedInUser.userId) === String(owner._id);

  if (loading) {
    return (
      <div className="simple-page">
        <p>Loading channel...</p>
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

  return (
    <div className="channel-page-inner">
      {/* Channel banner */}
      <img
        className="channel-banner"
        src={channel.banner || "https://picsum.photos/1200/200"}
        alt={`${channel.channelName} banner`}
      />

      {/* Channel information */}
      <div className="channel-info">
        <h1 className="channel-name">{channel.channelName}</h1>
        <p className="channel-description">{channel.description}</p>
        <p className="channel-stats">
          {channel.subscribers} subscribers · {channel.videoCount || videos.length}{" "}
          videos
        </p>

        {/* Show upload link if user owns the channel */}
        {isOwner && (
          <Link to={`/upload-video/${id}`} className="upload-link">
            Upload Video
          </Link>
        )}
      </div>

      {/* Videos belonging to this channel */}
      <h2 className="channel-videos-title">Videos</h2>

      {videos.length === 0 ? (
        <p className="no-channel-videos">No videos on this channel yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="channel-video-item">
              <VideoCard video={video} />

              {/* Edit and Delete only for channel owner */}
              {isOwner && (
                <div className="video-actions">
                  <button
                    className="edit-video-btn"
                    onClick={() => handleEditVideo(video)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-video-btn"
                    onClick={() => handleDeleteVideo(video._id)}
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
