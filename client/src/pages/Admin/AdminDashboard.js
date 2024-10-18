import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import DashboardHeader from "../../components/DashboardHeader";
import SideNav from "../../components/Admin/SideNav";
import AllDoctors from "../../components/Admin/AllDoctors";
import AllStaff from "../../components/Admin/AllStaff";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [channelCount, setChannelCount] = useState(0);
  const [insuranceClaimCount, setInsuranceClaimCount] = useState(0);

  useEffect(() => {
    fetchCounts();
    fetchChannelsAndClaims();
    calculateRevenue();
  }, []);

  const fetchCounts = async () => {
    try {
      const doctorRes = await axios.get("http://localhost:8070/doctor/");
      setDoctorCount(doctorRes.data.length);

      const staffRes = await axios.get("http://localhost:8070/admin/");
      setStaffCount(staffRes.data.length);

      const patientRes = await axios.get("http://localhost:8070/patient/");
      setPatientCount(patientRes.data.length);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchChannelsAndClaims = async () => {
    try {
      const channelRes = await axios.get("http://localhost:8070/channel/");
      setChannelCount(channelRes.data.length);

      const claimsRes = await axios.get("http://localhost:8070/insurance/");
      setInsuranceClaimCount(claimsRes.data.length);
    } catch (error) {
      console.error("Error fetching channels and claims:", error);
    }
  };

  const calculateRevenue = async () => {
    try {
      const appointmentRes = await axios.get("http://localhost:8070/appointment/");
      const revenue = appointmentRes.data.length * 100; // Assuming each appointment is $100
      setMonthlyRevenue(revenue);
    } catch (error) {
      console.error("Error calculating revenue:", error);
    }
  };

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [500, 600, 700, 800, 900, monthlyRevenue],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.4)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ["Doctors", "Patients"],
    datasets: [
      {
        label: "Count",
        data: [doctorCount, patientCount],
        backgroundColor: ["#4A90E2", "#50E3C2"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row flex-grow">
        <SideNav />
        <div className="flex-grow p-6 space-y-6 ">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Total Doctors</h2>
              <p className="text-3xl font-bold text-blue-600">{doctorCount}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Total Staff</h2>
              <p className="text-3xl font-bold text-blue-600">{staffCount}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Total Patients</h2>
              <p className="text-3xl font-bold text-yellow-600">{patientCount}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Monthly Revenue</h2>
              <p className="text-3xl font-bold text-green-600">${monthlyRevenue}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Total Channels</h2>
              <p className="text-3xl font-bold text-indigo-600">{channelCount}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Insurance Claims</h2>
              <p className="text-3xl font-bold text-red-600">{insuranceClaimCount}</p>
            </div>
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Revenue Over Time</h2>
              <Line data={revenueData} />
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Doctor vs. Patient Ratio</h2>
              <Bar data={barData} />
            </div>
          </div>

          {/* Data Tables */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Doctors</h2>
            <AllDoctors />
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Staff</h2>
            <AllStaff />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
