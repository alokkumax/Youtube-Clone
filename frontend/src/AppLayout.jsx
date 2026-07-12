import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/home.css";

// Shared layout with Header and Sidebar for browsing
function AppLayout() {
  const navigate = useNavigate();

  // Sidebar open on desktop by default
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle sidebar open/close
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // When user types in search, go to home page to show results
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    navigate("/");
  };

  return (
    <div className="home-page">
      <Header
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="home-body">
        {sidebarOpen && (
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        )}

        <main className="home-main">
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
