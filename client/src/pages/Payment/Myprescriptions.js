import React, { useEffect, useState } from 'react';
import axios from "axios";
import RowPrescriptionView from '../../components/Payment/RowPrescriptionView';
import PrescriptionDetails from '../../components/Payment/PrescriptionDetails';
import PatientSideBar from '../../components/PatientSideBar';
import DashboardHeader from '../../components/DashboardHeader';


const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pid, setPid] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPrescriptions();
  }, []);

  const getSearch = async () => {
    axios
      .get(`http://localhost:8070/prescription/patient/search/${pid}?query=${query}`)
      .then((res) => {
        setPrescriptions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPrescriptions = async () => {
    axios
      .get("http://localhost:8070/patient/check/", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setEmail(res.data.patient.email);
        setPassword(res.data.patient.password);
        setPid(res.data.patient._id);

        axios
          .get(`http://localhost:8070/prescription/patient/search/${res.data.patient._id}?query=${query}`)
          .then((res) => {
            setPrescriptions(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  return (
    <div>
      <DashboardHeader />
    <div className="main-dashboard-container">
      <PatientSideBar />

      <div className="dashboard-content">
        <h1 className="header-topic">My Prescriptions</h1>

        <div className="search-container">
          <input
            type="text"
            onKeyUp={getSearch}
            onKeyDown={getSearch}
            className="search-tests-input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {selectedPrescription ? (
          <PrescriptionDetails
            prescription={selectedPrescription}
            onBack={() => setSelectedPrescription(null)}
          />
        ) : (
          <table className="tests-table">
            <thead>
              <tr className="th-tests">
                <th>Prescription Id</th>
                <th>Appointment Id</th>
                <th>Date</th>
                <th>Prescription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((item) => (
                <RowPrescriptionView
                  key={item._id}
                  item={item}
                  onClick={() => setSelectedPrescription(item)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyPrescriptions;
