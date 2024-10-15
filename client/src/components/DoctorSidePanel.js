import React from 'react'

export default function DoctorSidePanel() {
  return (
    <div className="nav-bar">
    <ul className="nav-list">
      <a href="/doctorDashboard">
        <li className="nav-element active-element">Channeling Times</li>
      </a>
      <a href="/addChannel">
        <li className="nav-element">Create Channel</li>
      </a>
      <a href="/doctorProfile">
        <li className="nav-element">Profile</li>
      </a>
      <a href="/viewpatiets">
        <li className="nav-element">Patients</li>
      </a>
    </ul>
  </div>
  )
}
