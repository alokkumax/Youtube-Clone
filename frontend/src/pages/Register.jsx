import { Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Register</h1>

        <form className="auth-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="button" className="auth-btn">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
