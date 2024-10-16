import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")

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
<<<<<<< HEAD
    <div className="container mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-md max-w-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Insurance Claim Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            className="w-full p-2 border border-gray-300 rounded"
=======
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
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Sex Selection */}
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Sex</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="Male"
                className="mr-2"
                checked={claimDetails.sex === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="Female"
                className="mr-2"
                checked={claimDetails.sex === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
=======
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
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
          </div>
        </div>

        {/* Relationship to Insured */}
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Relationship to Insured</label>
          <select
            name="relationshipToInsured"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Relationship to Insured</label>
          <select
            name="relationshipToInsured"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
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
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
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
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.addressLine1}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.addressLine2}
            onChange={handleChange}
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>City</label>
          <input
            type="text"
            name="city"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.city}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">State/Province</label>
          <input
            type="text"
            name="state"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>State/Province</label>
          <input
            type="text"
            name="state"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.state}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.postalCode}
            onChange={handleChange}
            required
          />
        </div>
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="w-full p-2 border border-gray-300 rounded"
=======
        <div className="form-group mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            value={claimDetails.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* File Upload */}
<<<<<<< HEAD
        <div>
          <label className="block text-gray-600 font-medium mb-1">Upload Prescription</label>
          <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Claim
        </button>
=======
        <div className="form-group mb-3">
          <label>Upload Prescription</label>
          <input type="file" className="form-control" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Claim</button>
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
      </form>
    </div>
  );
}

export default InsuranceClaim;
