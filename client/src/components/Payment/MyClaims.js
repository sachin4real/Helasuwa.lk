import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Patientheader from './Patientheader';
import PatientSideBar from '../PatientSideBar';

const MyClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get('http://localhost:8070/insurance'); 
      setClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  return (
    <div>
      <Patientheader />
      <div className="flex">
        <PatientSideBar />
        

        <div className="flex-1 p-8 mt-16 ml-64 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-semibold mb-4">My Claim History</h2>


          <div className="overflow-auto rounded-lg shadow-lg mt-4">
            <table className="w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold">Claim ID</th>
                  <th className="py-2 px-4 text-left font-semibold">Claim Type</th>
                  <th className="py-2 px-4 text-left font-semibold">Reason</th>
                  <th className="py-2 px-4 text-left font-semibold">Submitted Date</th>
                </tr>
              </thead>
              <tbody>
                {claims.map(claim => (
                  <tr key={claim._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{claim.claimId}</td>
                    <td className="py-2 px-4">{claim.claimType}</td>
                    <td className="py-2 px-4">{claim.reason}</td>
                    <td className="py-2 px-4">
                      {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClaims;
