import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8070/patient/get/${id}`)
      .then(response => {
        // Since the patient data is nested under response.data.patient
        console.log(response.data); // Debugging to verify response structure
        setPatient(response.data.patient); // Access the nested patient object
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch patient details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>No patient data found</p>;
  }

  return (
    <div>
      <DoctorHeader />
      <div className="main-container">
        <DoctorSidePanel />
        <div className="content-container">
       <div className="patientProfile"> <h2>Patient Name: {patient.firstName || "N/A"} {patient.lastName || "N/A"}</h2></div>
          <div className="patientProfile">
         
            <p><b>Date of birth:</b> {patient.dob ? new Date(patient.dob).toDateString() : "N/A"}</p>
            <p><b>Email:</b> {patient.email || "N/A"}</p>
            <p><b>Phone no:</b> {patient.phoneNo || "N/A"}</p>
            <p><b>Gender:</b> {patient.gender || "N/A"}</p>
            <p><b>Height:</b> {patient.height ? `${patient.height} cm` : "N/A"}</p>
            <p><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "N/A"}</p>
            <p><b>Blood Group:</b> {patient.bloodGroup || "N/A"}</p>
            <p><b>Medical Status:</b> {patient.medicalStatus || "N/A"}</p>
            <p><b>Allergies:</b> {patient.allergies || "N/A"}</p>
            <p><b>Emergency No:</b> {patient.emergencyPhone || "N/A"}</p>
            <h2>Guardian Details</h2>
            <p><b>Guardian Name:</b> {patient.guardianName || "N/A"}</p>
            <p><b>Guardian Phone:</b> {patient.guardianPhone || "N/A"}</p>
            <p><b>Guardian NIC:</b> {patient.guardianNIC || "N/A"}</p>
            <h2>Insurance Details</h2>
            <p><b>Insurance No:</b> {patient.insuranceNo || "N/A"}</p>
            <p><b>Insurance Company:</b> {patient.insuranceCompany || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
