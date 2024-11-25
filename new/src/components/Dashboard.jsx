import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

import ProjectTable from "./ProjectTable";
import Employee from "./Employee";
import Attendance from "./Attendance";
import HourlyRate from "./HourlyRate";
const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col ">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="sidebar ">
          <Sidebar />
        </div>
        <div className="main-content   mt-15 p-20 lg:px-10">
          {name === "projects" && <ProjectTable />}
          {name === "employee" && <Employee />}
          {name === "attendance" && <Attendance />}
          {name === "hourlyrate" && <HourlyRate />}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
