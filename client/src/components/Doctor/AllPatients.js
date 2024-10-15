import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8070/patient/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        return response.json();
      })
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/viewpatient/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DoctorHeader />
      <div className="flex">
        <DoctorSidePanel />
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Patients</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-300 to-blue-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Gender</th>
                    <th className="px-6 py-4 text-left font-semibold">Medical Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="border-b last:border-none hover:bg-gray-100">
                      <td className="px-6 py-4 text-gray-700">{patient.firstName} {patient.lastName}</td>
                      <td className="px-6 py-4 text-gray-700">{patient.gender}</td>
                      <td className="px-6 py-4 text-gray-700">{patient.medicalStatus}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(patient._id)}
                          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200 transform hover:scale-105 hover:from-green-500 hover:to-blue-600"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
