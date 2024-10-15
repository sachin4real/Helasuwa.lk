import React from "react";

export default function DoctorHeader() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    console.log("You have logged out");
    window.location.href = "/";
  }

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-md text-white">
      {/* Logo and Site Title */}
      <div className="flex items-center space-x-4">
        <img className="w-12 h-12 rounded-full shadow-md" src="/images/Hospital logo B.png" alt="Hospital Logo" />
        <h1 className="text-2xl font-bold tracking-wide">Helasuwa.lk</h1>
      </div>

      {/* Logout Button */}
      {/* <button
        onClick={logout}
        className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
      >
        Logout
      </button> */}
    </div>
  );
}
