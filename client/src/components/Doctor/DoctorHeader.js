import React from "react";

export default function DoctorHeader() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.setItem("previous", false);
    console.log("You have logged out");
    window.location.href = "/";
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[#111053] shadow-lg text-white">
      <div className="flex items-center space-x-4">
        <img className="w-10 h-10" src="/images/Hospital logo B.png" alt="Hospital Logo" />
        <h1 className="text-xl font-semibold">Helasuwa.lk</h1>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
