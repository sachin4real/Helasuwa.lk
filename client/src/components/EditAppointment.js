import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatientHeader from "./Payment/Patientheader";
import PatientSideBar from "../components/PatientSideBar"; // Adjust path as needed

const EditAppointment = (props) => {
  let { aid, cid } = useParams();

  const [channel, setChannel] = useState([]);
  const [notes, setNotes] = useState("");
  const [appointment, setAppointment] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [contact, setContact] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    getApt();
    getChannel();
  }, []);

  const getApt = async () => {
    await axios
      .get(`http://localhost:8070/appointment/get/${aid}`)
      .then((res) => {
        setAppointment(res.data.apt);
        setNotes(res.data.apt.notes);
        setName(res.data.apt.name);
        setAge(res.data.apt.age);
        setContact(res.data.apt.contact);
        setGender(res.data.apt.gender);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getChannel = async () => {
    await axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function editApt(e) {
    e.preventDefault();

    const updatedApt = {
      notes,
      name,
      age,
      contact,
      gender,
    };

    axios
      .put(`http://localhost:8070/appointment/update/${aid}`, updatedApt)
      .then((res) => {
        alert("Appointment Updated");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    alert("You have logged out");
    window.location.href = "/";
  }

  return (
    <div className="flex">
      <PatientHeader />
      <PatientSideBar />

      <div className="flex-1 p-8 mt-16 bg-gray-50 min-h-screen ml-64"> {/* Added margin-left for sidebar */}
        <h1 className="text-3xl font-semibold mb-4">Edit Appointment</h1>

        <div className="channel-details-apt mb-6">
          <h4>Channeling Doctor - {channel.drName}</h4>
          <h4>
            Channeling Date and Time -{" "}
            {new Date(channel.startDateTime).toString()}
          </h4>
        </div>

        <form onSubmit={editApt}>
          <input
            className="apt-inputs mb-4"
            type="text"
            placeholder="Patient Name"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            className="apt-inputs mb-4"
            type="number"
            placeholder="Patient Age"
            defaultValue={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />

          <input
            className="apt-inputs mb-4"
            type="tel"
            placeholder="Contact No"
            defaultValue={contact}
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />

          <select
            className="apt-inputs mb-4"
            defaultValue={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <textarea
            className="apt-inputs mb-4"
            placeholder="Any Special Notes"
            cols="30"
            rows="10"
            defaultValue={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          ></textarea>

          <button className="btn-makeApt" type="submit">
            Update and Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
