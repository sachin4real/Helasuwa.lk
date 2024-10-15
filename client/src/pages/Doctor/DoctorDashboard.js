import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import axios from "axios";
import SideBar from "../../components/SideBar";
import DashboardHeader from "../../components/DashboardHeader";
import DoctorChannels from "../../components/DoctorChannels";
import DoctorSidePanel from "../../components/DoctorSidePanel";

const DoctorDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [maxPatients, setMaxPatients] = useState(0);
  const [startDateTime, setStartDateTime] = useState("");

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // setToken(token)
    console.log(token);

    getUser();
    localStorage.setItem("previous", true);
    if (token == null) {
      window.location.href = "/";
    } else {
      getUser();
    }
  }, []);

  const getUser = async () => {
    await axios
      .get("http://localhost:8070/doctor/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.doctor.email);
        setPassword(res.data.doctor.password);
        setName(res.data.doctor.name);
        setDoctor(res.data.doctor);
        setId(res.data.doctor._id);
        console.log(res.data.doctor._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.setItem("previous", false);
    alert("You have logged out");
    window.location.href = "/";
  }
  return (
    <div>
      {/* <div className="header-dashboard">
        <div>
          <h1>Dashbaord</h1>
        </div>
        <div></div>
        <div className="header-icons">
          <div className="profile-container">
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div> */}
      <DashboardHeader />

      <div className="main-container">
        <DoctorSidePanel/>
    

        <div className="content-container">
          <div>
            
            <DoctorChannels id={doctor._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
