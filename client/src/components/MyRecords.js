import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import PatientSideBar from "../components/PatientSideBar";
import MyReports from "./MyReports";
import AddRecord from "./AddRecord";

const MyRecords = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channels, setChannels] = useState([]);
  const [searched, setSearched] = useState(false);
  const [sChannels, setSChannels] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "/";
    } else {
      localStorage.setItem("previous", true);
      console.log(token);
    }
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="main-dashboard-container"> {/* Updated for consistent layout */}
        <PatientSideBar />

        <div className="dashboard-content"> {/* Updated to match MyPrescriptions layout */}
          <h1 className="header-topic">My Records</h1>
          <AddRecord />
          <MyReports />
        </div>
      </div>
    </div>
  );
};

export default MyRecords;
