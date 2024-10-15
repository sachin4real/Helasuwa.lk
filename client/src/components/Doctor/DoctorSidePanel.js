import React from 'react';

export default function DoctorSidePanel() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    console.log("You have logged out");
    window.location.href = "/";
  }

  return (
    <div className="flex flex-col justify-between bg-gray-100 min-h-screen w-64 p-6 shadow-lg">
      {/* Menu Items */}
      <ul className="space-y-4">
        <a href="/doctorDashboard">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Appontments Times
          </li>
        </a>
        <a href="/addChannel">
          <li className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm">
            Create Appontment Slot
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

      {/* Logout Button at the Bottom */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="w-full px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
