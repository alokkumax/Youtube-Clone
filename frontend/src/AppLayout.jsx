import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/home.css";

// Shared layout - sidebar is hidden and opens as overlay
function AppLayout() {
  const navigate = useNavigate();

  // Sidebar starts hidden (YouTube style drawer)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle sidebar open/close
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking backdrop or a link
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
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

      {/* Dark backdrop when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={handleCloseSidebar}></div>
      )}

      {/* Overlay sidebar drawer */}
      <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
        <Sidebar onClose={handleCloseSidebar} />
      </div>

      <div className="home-body">
        <main className="home-main">
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
