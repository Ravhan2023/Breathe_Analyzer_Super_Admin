import "./Login.css";
import axios from "axios";
import React, { useState } from "react";
import { baseurl } from "../../api/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseurl}api/dashboard-login/`, {
        username,
        password,
      });

      console.log("Login successful:", response.data);
      // Perform actions after successful login like redirecting the user
    } catch (error) {
      setError("Error logging in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="image-overlay">
          <div className="overlay-content">
            <div className="additional-card"></div>
            <div className="activity-card"></div>
            <div className="image-card"></div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <h2>Login for an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              //   minLength="8"
            />
          </div>
          <p className="password-hint">
            Your password must have at least 8 characters
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
