import { Link, useNavigate } from "react-router-dom";
import { saveUser } from "../services/auth";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  // Store sample user in localStorage and go to homepage
  const handleLogin = () => {
    const sampleUser = {
      username: "John",
      email: "john@example.com",
    };

    saveUser(sampleUser);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        <form className="auth-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="button" className="auth-btn" onClick={handleLogin}>
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
