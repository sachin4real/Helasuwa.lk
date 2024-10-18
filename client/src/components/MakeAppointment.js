import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import DashboardHeader from "./DashboardHeader";

const MakeAppointment = (props) => {
  let { cid } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patient, setPatient] = useState("");

  const [channel, setChannel] = useState([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [contact, setContact] = useState(null);
  const [gender, setGender] = useState(null);

  const [doctor, setDoctor] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [maxPatients, setMaxPatients] = useState("");
  const [drName, setDrName] = useState("");
  const [completed, setCompleted] = useState("");
  const [patients, setPatients] = useState(0);

  useEffect(() => {
    getUser();
    getChannel();
  }, []);

  const getChannel = async () => {
    axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);
        setDoctor(res.data.Channel.doctor);
        setStartDateTime(res.data.Channel.startDateTime);
        //   setMaxPatients(res.data.channel.maxPatients);
        setDrName(res.data.Channel.drName);
        setCompleted(res.data.Channel.completed);

        console.log(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };

  function getUser() {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.patient.email);
        setPassword(res.data.patient.password);
        setPatient(res.data.patient._id);

        console.log(res.data.patient.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  function makeApt(e) {
    e.preventDefault();

    if (age >= 0) {
      if (validatePhone(contact)) {
        const newApt = {
          channel,
          patient,
          notes,
          name,
          age,
          contact,
          gender,
        };
        axios
          .post("http://localhost:8070/appointment/makeapt", newApt)
          .then((res) => {
            alert("Appointment Made");
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert("Invalid phone Number");
      }
    } else {
      alert("Age should be 0 or greater than zero");
    }
  }
  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/patientHome ">
              <li className="nav-element active-element">Home</li>
            </a>
            <a href="/myAppointments">
              <li className="nav-element">My Appointments</li>
            </a>

            <a href="/patientProfile">
              <li className="nav-element">Profile</li>
            </a>

            <a href="/records">
              <li className="nav-element">My Records</li>
            </a>
          </ul>
        </div>

        <div className="contetn-container">
          <h1 className="heading-channels">Make an Appointment</h1>

          <h4 className="text-lg text-gray-700 font-medium">Channeling Doctor: {channel.drName}</h4>
          <h4 className="text-lg text-gray-700 font-medium">Channeling Date and Time: {new Date(channel.startDateTime).toString()}</h4>

          <form onSubmit={makeApt} className="space-y-6 mt-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Patient Name"
              onChange={(e) => setName(e.target.value)}
            />
            
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="Patient Age"
              onChange={(e) => setAge(e.target.value)}
            />
            
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="Patient Contact No"
              onChange={(e) => setContact(e.target.value)}
            />
            
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Any Special Notes"
              name=""
              id=""
              cols="30"
              rows="4"
            />
            
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              type="submit"
            >
              Make Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
