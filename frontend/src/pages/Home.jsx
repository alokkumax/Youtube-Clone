import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../services/videos";
import "../styles/home.css";

function Home() {
  const { searchQuery } = useOutletContext();

  // State to track which filter button is selected
  const [activeFilter, setActiveFilter] = useState("All");

  // Videos from backend
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load videos from backend when search or filter changes
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await getVideos(searchQuery || "", activeFilter);
        setVideos(data);
      } catch (error) {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [searchQuery, activeFilter]);

  return (
    <>
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {loading ? (
        <p className="no-videos">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="no-videos">No videos found.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
