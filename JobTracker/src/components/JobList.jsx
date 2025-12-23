import { useNavigate } from "react-router-dom";
import "./Joblist.css";
import { deleteJob } from "../services/api";

const colors = ["red", "blue", "green"];

const JobList = ({ jobs, refresh }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const userId = localStorage.getItem("userId");
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id, userId);
      refresh();
    }
  };

  return (
    <div className="cards">
      {jobs.map((job, index) => (
        <div key={job.id} className={`card ${colors[index % colors.length]}`}>
          <h3 className="company">{job.companyName}</h3>
          <p className="job-title">{job.jobTitle}</p>

          <p className="status">
            Status: <span>{job.status}</span>
          </p>

          <p className="date">
            Applied on:{" "}
            <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
          </p>

          <p className="contact">
            Email: <a href={`mailto:${job.email}`}>{job.email}</a>
          </p>

          <p className="contact">
            Contact: <span>{job.contact}</span>
          </p>

          <p className="job-link">
            Job Link:{" "}
            <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
              {job.jobLink}
            </a>
          </p>

          <p className="notes">
            Notes: <span>{job.notes}</span>
          </p>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit/${job.id}`)}
            >
              Edit
            </button>

            <button className="delete-btn" onClick={() => handleDelete(job.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
