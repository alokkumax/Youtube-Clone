import { Link } from "react-router-dom";
import { getUser } from "../services/auth";
import "../styles/sidebar.css";

function Sidebar() {
  const loggedInUser = getUser();

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-item">
        Home
      </Link>
      <div className="sidebar-item">Trending</div>
      <div className="sidebar-item">Subscriptions</div>
      <div className="sidebar-item">Library</div>
      <div className="sidebar-item">History</div>

      {/* Show create channel link when user is logged in */}
      {loggedInUser && (
        <Link to="/create-channel" className="sidebar-item">
          Create Channel
        </Link>
      )}
    </aside>
  );
}

export default Sidebar;
