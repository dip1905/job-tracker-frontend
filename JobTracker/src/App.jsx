import React from "react";
import AuthHome from "./pages/AuthHome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Jobform from "./components/JobForm.jsx";
import EditJob from "./components/EditJob.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthHome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobForm" element={<Jobform />} />
      <Route path="/edit/:id" element={<EditJob />} />
    </Routes>
  );
};

export default App;
