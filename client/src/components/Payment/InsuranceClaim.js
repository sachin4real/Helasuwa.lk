import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="container mx-auto mt-8 p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Insurance Claim Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Sex</label>
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
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Relationship to Insured</label>
          <select
            name="relationshipToInsured"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div>
          <label className="block text-gray-600 mb-1">Status</label>
          <select
            name="status"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div>
          <label className="block text-gray-600 mb-1">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.addressLine1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">City</label>
          <input
            type="text"
            name="city"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">State/Province</label>
          <input
            type="text"
            name="state"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={claimDetails.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Upload Prescription</label>
          <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Claim
        </button>
      </form>
    </div>
  );
}

export default InsuranceClaim;
