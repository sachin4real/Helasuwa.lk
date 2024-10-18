import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientHeader from "../../src/components/Payment/Patientheader"; // Adjust path as needed
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
      <PatientHeader />
      <div className="flex">
        <PatientSideBar />

        {/* Main content container with padding for spacing and margin-top for header gap */}
        <div className="flex-1 p-8 mt-16 ml-64 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-semibold mb-4">My Records</h1>
          
          {/* AddRecord Component */}
          <AddRecord />

          {/* MyReports Component */}
          <MyReports />
        </div>
      </div>
    </div>
  );
};

export default MyRecords;
