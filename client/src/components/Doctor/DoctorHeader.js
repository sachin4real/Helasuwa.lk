import React from 'react'

export default function DoctorHeader() {

    function logout() {
        localStorage.removeItem("token");
        localStorage.setItem("previous", false);
        console.log("You have logged out");
        window.location.href = "/";
      }

  return (
    <div className="header-dashboard">
    <div>
      <img className="logo-img" src="/images/Hospital logo B.png" alt="" />
    </div>
    <div>
      <h1>Helasuwa.lk</h1>
    </div>
    <div></div>
    <div className="header-icons">
      <div className="profile-container">
        <div></div>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  </div>
  )
}
