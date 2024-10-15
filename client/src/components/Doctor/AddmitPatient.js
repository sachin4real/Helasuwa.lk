import React from 'react';
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

export default function AdmitPatient() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DoctorHeader />
      <div className="flex">
        <DoctorSidePanel />
        <div className="flex-1 p-8 bg-gray-100  ">
          <h2 className="text-3xl font-semibold mb-6 ">Admit a Patient</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl ">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Patient ID</label>
              <input type="text" placeholder="Enter Patient ID" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Patient Name</label>
              <input type="text" placeholder="Enter Patient Name" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Patient Blood Pressure</label>
              <input type="text" placeholder="Enter Blood Pressure" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Next of Kin</label>
              <input type="text" placeholder="Enter Next of Kin" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Patient Age</label>
              <input type="number" placeholder="Enter Age" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Gender</label>
              <input type="text" placeholder="Enter Gender" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Occupation</label>
              <input type="text" placeholder="Enter Occupation" className="input-field" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Doctor Name</label>
              <input type="text" placeholder="Enter Doctor Name" className="input-field" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 mb-1">Description</label>
              <textarea placeholder="Enter Description" className="input-field h-28 resize-none"></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-bule-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Additional Tailwind classes
const inputStyles = `
  w-full px-4 py-2 border border-gray-300 rounded-lg 
  focus:outline-none focus:border-blue-500 bg-gray-100
`;

// Apply the inputStyles to all input fields
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`.input-field { ${inputStyles} }`, styleSheet.cssRules.length);
