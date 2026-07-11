import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="simple-page">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;
