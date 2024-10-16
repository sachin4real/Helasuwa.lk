import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import ChooseLogin from "./pages/Logins/ChooseLogin";
import PatientHome from "./components/PatientHome";
import AdminDashboard from "./components/AdminDashboard";
import PatientLogin from "./pages/Logins/PatientLogin";
import DoctorLogin from "./pages/Logins/DoctorLogin";
import AdminLogin from "./pages/Logins/AdminLogin";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import MakeAppointment from "./components/MakeAppointment";
import ViewChannel from "./components/Doctor/ViewChannel";
import SearchChannels from "./components/SearchChannels";
import PatientAppointments from "./components/PatientAppointments";
import LaboratoryDashboard from "./components/Admin/LaboratoryDashboard";
import AddPatientReport from "./components/AddPatientReport";
import EditPatientProfile from "./components/EditPatientProfile";
import PatientProfile from "./components/PatientProfile";
import EditChannel from "./components/Doctor/EditChannel";
import StaffDashboard from "./components/Admin/StaffDashboard";
import AddDoctor from "./components/Admin/AddDoctor";
import EditAppointment from "./components/EditAppointment";
import EditStaff from "./components/EditStaff";
import StaffProfile from "./components/Admin/StaffProfile";
import EditReport from "./components/EditReport";
import MyRecords from "./components/MyRecords";
import EditRecord from "./components/EditRecord";
import AddInventory from "./components/Admin/AddInventory";
// import AllPatients from "./components/Doctor/AllPatients";
// import Viewpatient from "./components/Doctor/Viewpatient";
// import AddmitPatient from "./components/Doctor/AdmitPatient";
// import DoctorProfile from "./components/Doctor/DoctorProfile";
// import AddChannel from "./components/Doctor/AddChannel";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

=======
import AllPatients from "./components/Doctor/AllPatients";
import Viewpatient from "./components/Doctor/Viewpatient";
import AddmitPatient from "./components/Doctor/AddmitPatient";
>>>>>>> parent of 168a6fe (bootstrap removed)
import InsuranceClaim from "./components/Payment/InsuranceClaim";

import MyPrescriptions from "./pages/Payment/Myprescriptions";
>>>>>>> parent of dc471a2 (Revert "Merge pull request #9 from sachin4real/Dulan")
=======
import AllPatients from "./components/Doctor/AllPatients";
import Viewpatient from "./components/Doctor/Viewpatient";
import AddmitPatient from "./components/Doctor/AddmitPatient";
import InsuranceClaim from "./components/Payment/InsuranceClaim";

import MyPrescriptions from "./pages/Payment/Myprescriptions";
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/patientLogin" element={<PatientLogin />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Patient */}
          <Route path="/patientHome" element={<PatientHome />} /> 
          <Route path="/records" element={<MyRecords />} />
          <Route path="/editRecord/:id" element={<EditRecord />} />
          <Route path="/editPatientProfile" element={<EditPatientProfile />} />
          <Route path="/patientProfile" element={<PatientProfile />} />
          <Route path="/myAppointments" element={<PatientAppointments />} />
          <Route path="/editApt/:aid/:cid" element={<EditAppointment />} />
          <Route path="/makeApt/:cid" element={<MakeAppointment />} />

          <Route path="/myPrescriptions" element={<MyPrescriptions />} />
          <Route path="/insurance-claim" element={<InsuranceClaim />} />


          
       


          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ChooseLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/inventory" element={<AddInventory />} />
          
          {/* doctor */}
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/viewChannel/:cid" element={<ViewChannel />} />
          <Route path="/editChannel/:cid" element={<EditChannel />} />
          <Route path="/searchChannels/:date?/:doctor?" element={<SearchChannels />} />
          {/* <Route path="/addChannel" element={<AddChannel />} /> */}
          {/* <Route path="/doctorProfile" element={<DoctorProfile />} /> */}
          {/* <Route path="/viewpatient/:id" element={<Viewpatient />} /> */}
          {/* <Route path="/addmit" element={<AddmitPatient />} /> */}
          {/* <Route path="/allpatients" element={<AllPatients />} /> */}
        

          <Route path="/laboratory" element={<LaboratoryDashboard />} />
          <Route path="/addReport/:tid/:pid" element={<AddPatientReport />} />
          <Route path="/editReport/:tid/:pid" element={<EditReport />} />

          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/doctor" element={<AddDoctor />} />
          <Route path="/editStaff/:sid" element={<EditStaff />} />
          <Route path="/staffProfile" element={<StaffProfile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
