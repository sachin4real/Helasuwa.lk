import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPatient({ id }) { // Accept id as a prop
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8070/patient/get/${id}`)
      .then((response) => {
        setPatient(response.data.patient);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch patient details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!patient) {
    return <p className="text-center text-gray-500">No patient data found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      
      <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg">
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Profile</h2>
          <div className="space-y-4">
            <p className="text-lg"><span className="font-medium text-gray-600">Name:</span> {patient.firstName} {patient.lastName}</p>
            <p><b className="font-medium text-gray-600">Date of birth:</b> {patient.dob ? new Date(patient.dob).toDateString() : "N/A"}</p>
            <p><b className="font-medium text-gray-600">Email:</b> {patient.email || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Phone no:</b> {patient.phoneNo || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Gender:</b> {patient.gender || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Height:</b> {patient.height ? `${patient.height} cm` : "N/A"}</p>
            <p><b className="font-medium text-gray-600">Weight:</b> {patient.weight ? `${patient.weight} kg` : "N/A"}</p>
            <p><b className="font-medium text-gray-600">Blood Group:</b> {patient.bloodGroup || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Medical Status:</b> {patient.medicalStatus || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Allergies:</b> {patient.allergies || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Emergency No:</b> {patient.emergencyPhone || "N/A"}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Guardian Details</h2>
          <div className="space-y-4">
            <p><b className="font-medium text-gray-600">Guardian Name:</b> {patient.guardianName || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Guardian Phone:</b> {patient.guardianPhone || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Guardian NIC:</b> {patient.guardianNIC || "N/A"}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Insurance Details</h2>
          <div className="space-y-4">
            <p><b className="font-medium text-gray-600">Insurance No:</b> {patient.insuranceNo || "N/A"}</p>
            <p><b className="font-medium text-gray-600">Insurance Company:</b> {patient.insuranceCompany || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
