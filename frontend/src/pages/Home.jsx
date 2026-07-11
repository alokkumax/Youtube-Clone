import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";
import { videos } from "../services/videos";
import "../styles/home.css";

function Home() {
  // State to show or hide sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State to track which filter button is selected
  const [activeFilter, setActiveFilter] = useState("All");

  // State to store search text from header
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle sidebar open and close
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter videos based on selected category
  let filteredVideos =
    activeFilter === "All"
      ? videos
      : videos.filter((video) => video.category === activeFilter);

  // Filter videos by search title (ignore uppercase/lowercase)
  if (searchQuery.trim() !== "") {
    filteredVideos = filteredVideos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="home-page">
      <Header
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="home-body">
        {/* Show sidebar only when sidebarOpen is true */}
        {sidebarOpen && <Sidebar />}

        <main className="home-main">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {filteredVideos.length === 0 ? (
            <p className="no-videos">No videos found.</p>
          ) : (
            <div className="video-grid">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
