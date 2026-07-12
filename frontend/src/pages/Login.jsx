import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveUser } from "../services/auth";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login using backend API
  const handleLogin = async () => {
    try {
      setError("");
      const data = await loginUser(email, password);

      // Save JWT and user info
      saveUser(
        {
          username: data.username,
          email: data.email,
          userId: data.userId,
        },
        data.token
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
