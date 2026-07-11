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

  // Toggle sidebar open and close
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter videos based on selected category
  const filteredVideos =
    activeFilter === "All"
      ? videos
      : videos.filter((video) => video.category === activeFilter);

  return (
    <div className="home-page">
      <Header onMenuClick={handleMenuClick} />

      <div className="home-body">
        {/* Show sidebar only when sidebarOpen is true */}
        {sidebarOpen && <Sidebar />}

        <main className="home-main">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
