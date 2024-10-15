import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorHeader from './DoctorHeader';
import DoctorSidePanel from "./DoctorSidePanel";

const DoctorProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const validatePassword = (tpassword) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(tpassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const updateDoctor = async () => {
    const updatedDoctor = { name, email, qualifications, specialization, password };

    if (password === confirmPassword) {
      if (validatePassword(password)) {
        if (validateEmail(email)) {
          await axios
            .put(`http://localhost:8070/doctor/update/${id}`, updatedDoctor)
            .then(() => alert("Doctor Profile Updated"))
            .catch((err) => alert(err));
        } else {
          alert("Invalid Email");
        }
      } else {
        alert("Password must contain 8 characters including 1 lowercase letter, one uppercase letter, one number, and at least one special character.");
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:8070/doctor/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { email, password, name, qualifications, specialization, _id } = res.data.doctor;
        setEmail(email);
        setPassword(password);
        setConfirmPassword(password);
        setName(name);
        setDoctor(res.data.doctor);
        setId(_id);
        setQualifications(qualifications);
        setSpecialization(specialization);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DoctorHeader />
      <div className="flex">
        <DoctorSidePanel />
        <div className="flex-1 p-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Doctor Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Specialized In</label>
                <input
                  type="text"
                  className="input-field"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Qualifications</label>
                <input
                  type="text"
                  className="input-field"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={updateDoctor}
              >
                Update and Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional Tailwind classes for input styling to match a clean view
const inputStyles = `
  w-full p-3 rounded-lg bg-gray-100 text-gray-800
`;

// Add input field style globally using JavaScript to ensure reusability
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`.input-field { ${inputStyles} }`, styleSheet.cssRules.length);

export default DoctorProfile;
