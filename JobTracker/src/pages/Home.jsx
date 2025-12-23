import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Countnumber from "../components/countNumber.jsx";
import Searchbar from "../components/SearchBar.jsx";
import JobList from "../components/JobList.jsx";
import { useEffect, useState } from "react";
import { getMyJobs, searchByCompany } from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await getMyJobs(userId);
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleSearch = async (name) => {
    const userId = localStorage.getItem("userId");
    if (!name.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    const res = await searchByCompany(name, userId);
    setFilteredJobs(res.data);
  };

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.status === status));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1 className="heading">Job Application Tracker</h1>
      <nav className="button-container">
        <Link to="/JobForm" className="link">
          Add Application
        </Link>
        <button className="link" onClick={logout}>
          Logout
        </button>
      </nav>
      <Countnumber jobs={jobs} onFilter={handleFilter} />
      <Searchbar onSearch={handleSearch} />
      <JobList jobs={filteredJobs} refresh={fetchJobs} />
    </div>
  );
}

export default Home;
