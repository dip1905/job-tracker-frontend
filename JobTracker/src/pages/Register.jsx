import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import './login.css'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="form">
        <p class="form-title">Create new account</p>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
