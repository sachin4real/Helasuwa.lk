import React from 'react';

export default function DoctorSidePanel() {
  return (
    <div className="bg-gray-100 min-h-screen w-64 p-6 shadow-lg">
      <ul className="space-y-4">
        <a href="/doctorDashboard">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Channeling Times
          </li>
        </a>
        <a href="/addChannel">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Create Channel
          </li>
        </a>
        <a href="/doctorProfile">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Profile
          </li>
        </a>
        <a href="/allpatients">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Patients
          </li>
        </a>
        <a href="/addmit">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Admit Patient
          </li>
        </a>
      </ul>
    </div>
  );
}
