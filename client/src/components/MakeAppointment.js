import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "../../src/components/Payment/Patientheader"; // Update the path if necessary
import PatientSideBar from "../../src/components/PatientSideBar"; // Update the path if necessary

const MakeAppointment = () => {
  let { cid } = useParams();
  const [email, setEmail] = useState("");
  const [patient, setPatient] = useState("");
  const [channel, setChannel] = useState([]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [contact, setContact] = useState(null);
  const [gender, setGender] = useState(null);
  const [doctor, setDoctor] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [drName, setDrName] = useState("");

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
        setDrName(res.data.Channel.drName);
      })
      .catch((err) => {
        alert(err.message);
      });
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
        setPatient(res.data.patient._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }

  const validatePhone = (phn) => {
    const phoneNumberPattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneNumberPattern.test(phn);
  };

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
        alert("Invalid phone number");
      }
    } else {
      alert("Age should be 0 or greater");
    }
  }

  return (
    <div>
      {/* Updated header */}
      <PatientHeader />

      <div className="flex">
        {/* Updated sidebar */}
        <PatientSideBar />

        <div className="ml-[220px] mt-[80px] p-8 flex-1 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Make an Appointment</h1>

          <h4>Channeling Doctor: {channel.drName}</h4>
          <h4>Channeling Date and Time: {new Date(channel.startDateTime).toString()}</h4>

          <form onSubmit={makeApt}>
            <input
              className="apt-inputs"
              type="text"
              placeholder="Patient Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br /> <br />
            <input
              className="apt-inputs"
              type="number"
              placeholder="Patient Age"
              onChange={(e) => setAge(e.target.value)}
            />
            <br /> <br />
            <input
              className="apt-inputs"
              type="number"
              placeholder="Patient Contact No"
              onChange={(e) => setContact(e.target.value)}
            />
            <br /> <br />
            <select
              className="apt-inputs"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br /> <br />
            <textarea
              className="apt-inputs"
              placeholder="Any Special Notes"
              onChange={(e) => setNotes(e.target.value)}
              cols="30"
              rows="10"
            />
            <br /> <br />
            <button className="btn-makeApt" type="submit">
              Make Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
