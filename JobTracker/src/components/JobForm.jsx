import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobForm.css";
import { addJob } from "../services/api";

const JobForm = () => {
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
  console.log(form);

  const handleChange = (e) => {
    const value =
      e.target.name === "contact" ? parseInt(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    try {
      await addJob(form, userId);
      alert("Job Added Successfully");
      setForm({
        companyName: "",
        contact: "",
        email: "",
        jobTitle: "",
        jobLink: "",
        appliedDate: "",
        status: "",
        notes: "",
      });
      navigate("/Home");
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="title">Add Application</h1>
        <input
          type="text"
          name="companyName"
          placeholder="CompanyName"
          onChange={handleChange}
          value={form.companyName}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          onChange={handleChange}
          value={form.contact}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="jobtitle"
          onChange={handleChange}
          value={form.jobTitle}
        />
        <input
          type="text"
          name="jobLink"
          placeholder="joblink"
          onChange={handleChange}
          value={form.jobLink}
        />
        <input
          type="date"
          name="appliedDate"
          placeholder="Date"
          onChange={handleChange}
          value={form.appliedDate}
        />
        <select
          name="status"
          className="status"
          onChange={handleChange}
          value={form.status}
        >
          <option value="">Select Status</option>
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="upcoming">Up-Coming</option>
        </select>
        <textarea
          placeholder="Notes"
          name="notes"
          onChange={handleChange}
          value={form.notes}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
