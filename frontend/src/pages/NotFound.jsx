import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Invalid URL</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="not-found-btn">
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;
