import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaFlask, FaUsers, FaUserMd, FaUser, FaBox } from "react-icons/fa";

const SideNav = () => {
  return (
    <div className="bg-blue-900 text-white w-64 p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
      <p className="text-gray-300 mb-6">Welcome back, Administrator!</p>
      <nav className="space-y-3">
        <NavLink
          to="/admindashboard"
          exact
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaHome className="mr-3" />
          <span>Overview</span>
        </NavLink>
        <NavLink
          to="/laboratory"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaFlask className="mr-3" />
          <span>Laboratory</span>
        </NavLink>
        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaUsers className="mr-3" />
          <span>Staff Management</span>
        </NavLink>
        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaUserMd className="mr-3" />
          <span>Add Doctor</span>
        </NavLink>
        <NavLink
          to="/staffProfile"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaUser className="mr-3" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          <FaBox className="mr-3" />
          <span>Inventory</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
