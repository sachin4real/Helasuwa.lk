import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function InsuranceClaim() {
  const [claimDetails, setClaimDetails] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    relationshipToInsured: '',
    status: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    mobileNumber: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails({ ...claimDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(claimDetails).forEach((key) => {
      formData.append(key, claimDetails[key]);
    });
    if (file) formData.append('prescription', file);

    try {
      await axios.post('http://localhost:8070/insurance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Insurance claim submitted successfully!');
    } catch (error) {
      console.error('Error submitting insurance claim:', error);
      alert('Submission failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Insurance Claim Form</h3>
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
        {/* Basic Information */}
        <div className="form-group mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={claimDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={claimDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            className="form-control"
            value={claimDetails.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Sex Selection */}
        <div className="form-group mb-3">
          <label>Sex</label>
          <div>
            <input
              type="radio"
              name="sex"
              value="Male"
              checked={claimDetails.sex === "Male"}
              onChange={handleChange}
              required
            /> Male
            <input
              type="radio"
              name="sex"
              value="Female"
              checked={claimDetails.sex === "Female"}
              onChange={handleChange}
              required
            /> Female
          </div>
        </div>

        {/* Relationship to Insured */}
        <div className="form-group mb-3">
          <label>Relationship to Insured</label>
          <select
            name="relationshipToInsured"
            className="form-control"
            value={claimDetails.relationshipToInsured}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Self">Self</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group mb-3">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={claimDetails.status}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address Fields */}
        <div className="form-group mb-3">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="form-control"
            value={claimDetails.addressLine1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="form-control"
            value={claimDetails.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={claimDetails.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>State/Province</label>
          <input
            type="text"
            name="state"
            className="form-control"
            value={claimDetails.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
            value={claimDetails.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            value={claimDetails.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* File Upload */}
        <div className="form-group mb-3">
          <label>Upload Prescription</label>
          <input type="file" className="form-control" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Claim</button>
      </form>
    </div>
  );
}

export default InsuranceClaim;
