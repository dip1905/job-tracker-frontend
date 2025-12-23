import { useState } from "react";
import { login } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/home");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <p class="form-title">Log in to your account</p>
          <div class="input-container">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span></span>
          </div>
          <div class="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit">
            Login
          </button>
          <p class="signup-link">
            No account?
            <Link to="/register" class="link">
              {" "}
              Register{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
