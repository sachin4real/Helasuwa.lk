import React from 'react';
import DoctorSidePanel from "./DoctorSidePanel";
import DashboardHeader from "../DashboardHeader";

export default function AddmitPatient() {
  return (
    <div>
      <DashboardHeader />
      <div style={styles.mainContainer}>
        <DoctorSidePanel />
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Admit a Patient</h2>
          <form style={styles.admitForm}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Patient ID</label>
              <input type="text" placeholder="Enter Patient ID" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Patient Name</label>
              <input type="text" placeholder="Enter Patient Name" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Patient Blood Pressure</label>
              <input type="text" placeholder="Enter Blood Pressure" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Next of Kin</label>
              <input type="text" placeholder="Enter Next of Kin" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Patient Age</label>
              <input type="number" placeholder="Enter Age" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Gender</label>
              <input type="text" placeholder="Enter Gender" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Occupation</label>
              <input type="text" placeholder="Enter Occupation" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Doctor Name</label>
              <input type="text" placeholder="Enter Doctor Name" style={styles.input} />
            </div>
            <div style={{ ...styles.formGroup, ...styles.description }}>
              <label style={styles.label}>Description</label>
              <textarea placeholder="Enter Description" style={styles.textarea}></textarea>
            </div>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
  },
  formContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  admitForm: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    fontSize: '1rem',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    fontSize: '1rem',
    resize: 'none',
    height: '100px',
  },
  description: {
    gridColumn: 'span 2',
  },
  submitButton: {
    gridColumn: 'span 2',
    padding: '10px',
    backgroundColor: '#4a69bd',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    textAlign: 'center',
    width: '100%',
  },
  submitButtonHover: {
    backgroundColor: '#3b4a8b',
  },
};
