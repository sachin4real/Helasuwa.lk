import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8070/patient/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        return response.json();
      })
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/viewpatient/${id}`);
  };

  return (
    <div>
     <DoctorHeader/>
      <div style={styles.mainContainer}>
        <DoctorSidePanel />
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>All Patients</h1>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Gender</th>
                <th style={styles.tableHeader}>Medical Status</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{patient.firstName} {patient.lastName}</td>
                  <td style={styles.tableCell}>{patient.gender}</td>
                  <td style={styles.tableCell}>{patient.medicalStatus}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.button}
                      onClick={() => handleViewDetails(patient._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: '#f5f6fa',
  },
  contentContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '2rem',
    color: '#2f3640',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0 auto',
    maxWidth: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#4a148c',
    color: '#ffffff',
    padding: '10px',
    fontWeight: '600',
    textAlign: 'left',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #dcdde1',
  },
  tableCell: {
    padding: '10px',
    color: '#2f3640',
  },
  button: {
    background: 'linear-gradient(45deg, #00b09b, #96c93d)', // Green gradient
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    width: '100px',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#1e3799',
  },
};
