import "./Login.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../api/api";
import { UserContext } from "../../api/UserContext";
import backgroundImage from "../../assets/backgroundImage.jpg";
import { storeAuthToken } from "../../api/Auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseurl}api/dashboard-login/`, {
        username,
        password,
      });
      storeAuthToken(response.data.token);

      console.log("Login successful:", response.data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate(`/${response.data.user_type.replace(" ", "-").toLowerCase()}`);
    } catch (error) {
      setError("Error logging in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={backgroundImage} height="100%" width="100%" />
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <div className="avatar"></div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p className="forgot-password">Forget Password?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
