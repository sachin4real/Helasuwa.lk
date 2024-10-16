import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from '../../components/Doctor/DoctorHeader';
import DoctorSidePanel from '../../components/Doctor/DoctorSidePanel';
import DoctorChannels from '../../components/Doctor/DoctorChannels';
import AddChannel from '../../components/Doctor/AddChannel';
import AdmitPatient from '../../components/Doctor/AddmitPatient';
import AllPatients from '../../components/Doctor/AllPatients';
import DoctorProfile from '../../components/Doctor/DoctorProfile';
import ViewPatient from '../../components/Doctor/Viewpatient';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('channels');
  const [selectedPatient, setSelectedPatient] = useState(null); // To store selected patient for viewing details
  const navigate = useNavigate();

  // Fetch doctor information on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    } else {
      getUser();
    }
    localStorage.setItem('previous', true);
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8070/doctor/check/', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setDoctor(response.data.doctor);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/'); // Redirect to login if fetching user fails
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('previous', false);
    alert('You have logged out');
    navigate('/');
  };

  // Function to render the selected component
  const renderContent = () => {
    switch (selectedComponent) {
      case 'channels':
        return <DoctorChannels id={doctor._id} />;
      case 'addChannel':
        return <AddChannel />;
      case 'admitPatient':
        return <AdmitPatient />;
      case 'allPatients':
        return (
          <AllPatients onViewPatient={(patient) => {
            setSelectedPatient(patient);
            setSelectedComponent('viewPatient');
          }} />
        );
      case 'profile':
        return <DoctorProfile />;
      case 'viewPatient':
        return <ViewPatient patient={selectedPatient} />;
      default:
        return <DoctorChannels id={doctor._id} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DoctorHeader />

      <div className="flex flex-1">
        {/* Sidebar for navigation */}
        <DoctorSidePanel setSelectedComponent={setSelectedComponent} />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-6">
          {renderContent()}
        </div>
      </div>

      {/* Logout button at the bottom of the sidebar */}
      <div className="fixed bottom-0 left-0 p-4 w-full bg-gray-200">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
