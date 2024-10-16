import React from 'react';

export default function AdmitPatient() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Admit a Patient</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Patient ID</label>
            <input
              type="text"
              placeholder="Enter Patient ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              placeholder="Enter Patient Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Patient Blood Pressure</label>
            <input
              type="text"
              placeholder="Enter Blood Pressure"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Next of Kin</label>
            <input
              type="text"
              placeholder="Enter Next of Kin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Patient Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Gender</label>
            <input
              type="text"
              placeholder="Enter Gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Occupation</label>
            <input
              type="text"
              placeholder="Enter Occupation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Doctor Name</label>
            <input
              type="text"
              placeholder="Enter Doctor Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Enter Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100 h-28 resize-none"
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
