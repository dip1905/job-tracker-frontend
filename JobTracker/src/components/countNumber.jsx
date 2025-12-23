import React from "react";
import "./countNumber.css";

const CountNumber = ({jobs, onFilter}) => {
  const count = (status) =>
    jobs.filter(job => job.status === status).length;

  return (
    <div className="count-number">
      <div className="count-item total" onClick={()=>onFilter("all")}>
        <h1>Total Applications</h1>
        <h3>{jobs.length}</h3>
      </div>
      <div className="count-item applied" onClick={()=>onFilter("applied")}>
        <h1>Applied</h1>
        <h3>{count("applied")}</h3>
      </div>
      <div className="count-item pending" onClick={()=>onFilter("pending")}>
        <h1>Pending</h1>
        <h3>{count("pending")}</h3>
      </div>
      <div className="count-item interview" onClick={()=>onFilter("interviewed")}>
        <h1>Interview</h1>
        <h3>{count("interviewed")}</h3>
      </div>
      <div className="count-item upcoming" onClick={()=>onFilter("upcoming")}>
        <h1>Up-Coming</h1>
        <h3>{count("upcoming")}</h3>
      </div>
      <div className="count-item rejected" onClick={() => onFilter("rejected")}>
        <h1>Rejected</h1>
        <h3>{count("rejected")}</h3>
      </div>
    </div>
  );
};

export default CountNumber;
