import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../services/api";
import "./Jobform.css";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    contact: "",
    email: "",
    jobTitle: "",
    jobLink: "",
    appliedDate: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const userId = localStorage.getItem("userId"); // no fallback needed
        const res = await getJobById(id, userId);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.name === "contact" ? parseInt(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await updateJob(id, form, userId);
      alert("Job Updated Successfully");
      navigate("/Home");
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Edit Job</h1>

        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
        />
        <input name="contact" value={form.contact} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="jobTitle" value={form.jobTitle} onChange={handleChange} />
        <input name="jobLink" value={form.jobLink} onChange={handleChange} />
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="upcoming">Up-Coming</option>
        </select>

        <textarea name="notes" value={form.notes} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditJob;
