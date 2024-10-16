import React from 'react';
import '../styles/patientSidebar.css'; // Adjust the path if needed

const PatientSideBar = () => {
  return (
    <div className="patient-nav-bar">
      <ul className="patient-nav-list">
        <a href="/patientHome">
          <li className="patient-nav-element">Home</li>
        </a>
        <a href="/myAppointments">
          <li className="patient-nav-element">My Appointments</li>
        </a>
        <a href="/patientProfile">
          <li className="patient-nav-element">Profile</li>
        </a>
        <a href="/records">
          <li className="patient-nav-element">My Records</li>
        </a>
        <a href="/myPrescriptions">
          <li className="patient-nav-element">My Prescriptions</li>
        </a>
      </ul>
    </div>
  );
};

export default PatientSideBar;
