import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import PatientHeader from "../../src/components/Payment/Patientheader";
import PatientSideBar from "../components/PatientSideBar";

const PatientProfile = () => {
  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";

  const [patient, setPatient] = useState([]);
  const [pid, setPid] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPatient(res.data.patient);
        setPid(res.data.patient._id);
        console.log(res.data.patient.email);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  const deletePatient = async () => {
    axios
      .delete(`http://localhost:8070/patient/delete/${pid}`)
      .then(() => {
        alert("Patient Deleted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const downloadProfile = () => {
    const doc = new jsPDF();
    const margin = 10;

    const text = `\n\nPatient Report \n\n
      Name : ${patient.firstName}  ${patient.lastName} \n
      Date of Birth : ${new Date(patient.dob).toDateString()} \n
      Email : ${patient.email} \n
      Gender : ${patient.gender}\n
      Height : ${patient.height} \n
      Weight : ${patient.weight} \n
      Phone : ${patient.phoneNo}\n
      Blood Group : ${patient.bloodGroup}\n
      Civil Status : ${patient.civilStatus} \n
      Medical Status : ${patient.medicalStatus}\n
      Emergency Phone : ${patient.emergencyPhone}\n
      Guardian Name : ${patient.guardianName}\n
      Guardian NIC : ${patient.guardianNIC}\n
      Guardian Phone No : ${patient.guardianPhone}\n
      Insurance No : ${patient.insuranceNo} \n
      Insurance Company : ${patient.insuranceCompany} \n
    `;
    
    const splitText = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(
      dataURL1,
      "PNG",
      5,
      5,
      pdfWidth / 4,
      (pdfWidth / 4) * (logo.height / logo.width)
    );

    doc.text(
      "Ceyloan Health \nTel: 0771231231 \nAddress No: No:11,Kandy road,Malabe",
      pdfWidth / 4 + 15,
      20
    );

    doc.save(`${patient._id}.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <PatientHeader />
      <div className="flex">
        <PatientSideBar />
        <div className="flex-1 p-8 mt-16 ml-64 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Patient Profile
            </h1>
            <button
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              onClick={deletePatient}
            >
              Delete Profile
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700">
              Patient Name: {patient.firstName} {patient.lastName}
            </h2>
            <p>
              <b>Date of Birth:</b> {new Date(patient.dob).toDateString()}
            </p>
            <p>
              <b>Email:</b> {patient.email}
            </p>
            <p>
              <b>Phone No:</b> {patient.phoneNo}
            </p>
            <p>
              <b>Gender:</b> {patient.gender}
            </p>
            <p>
              <b>Height:</b> {patient.height} cm
            </p>
            <p>
              <b>Weight:</b> {patient.weight} kg
            </p>
            <p>
              <b>Blood Group:</b> {patient.bloodGroup}
            </p>
            <p>
              <b>Medical Status:</b> {patient.medicalStatus}
            </p>
            <p>
              <b>Allergies:</b> {patient.allergies}
            </p>
            <p>
              <b>Emergency Phone No:</b> {patient.emergencyPhone}
            </p>

            <h2 className="text-lg font-semibold">Guardian Details</h2>
            <p>
              <b>Guardian Name:</b> {patient.guardianName}
            </p>
            <p>
              <b>Guardian Phone:</b> {patient.guardianPhone}
            </p>
            <p>
              <b>Guardian NIC:</b> {patient.guardianNIC}
            </p>

            <h2 className="text-lg font-semibold">Insurance Details</h2>
            <p>
              <b>Insurance No:</b> {patient.insuranceNo}
            </p>
            <p>
              <b>Insurance Company:</b> {patient.insuranceCompany}
            </p>
          </div>

          <div className="mt-6 flex space-x-4">
            <a href="/editPatientProfile">
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                Edit
              </button>
            </a>
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
              onClick={downloadProfile}
            >
              Download Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
