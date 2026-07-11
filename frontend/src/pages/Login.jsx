import { Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        <form className="auth-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="button" className="auth-btn">
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
