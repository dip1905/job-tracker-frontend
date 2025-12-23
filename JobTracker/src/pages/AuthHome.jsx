import React from "react";
import LoginForm from "./Login.jsx";
import Register from "./Register.jsx";
import "./AuthHome.css";

const AuthHome = () => {
  return (
    <div className="auth-container">
      <h1>Job Tracker Take Control of Your Career</h1>
      <p>Sign in to manage all your job applications in one place.</p>
      <LoginForm />
    </div>
  );
};

export default AuthHome;
