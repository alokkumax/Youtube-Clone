import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-item">Home</div>
      <div className="sidebar-item">Trending</div>
      <div className="sidebar-item">Subscriptions</div>
      <div className="sidebar-item">Library</div>
      <div className="sidebar-item">History</div>
    </aside>
  );
}

export default Sidebar;
