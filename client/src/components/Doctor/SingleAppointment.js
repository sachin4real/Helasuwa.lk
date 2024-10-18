import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import SinglePrescription from "./SinglePrescription";

const SingleAppointment = ({ apt }) => {
  const logo = new Image();
  logo.src = "/images/Hospital-logo-W.png";

  const [patient, setPatient] = useState("");
  const [pid, setPid] = useState(apt.patient);
  const [beforAfter, setBeforeAfter] = useState("After");

  const [morning, setMorning] = useState(false);
  const [evening, setEvening] = useState(false);
  const [night, setNight] = useState(false);

  const [morningQ, setMorningQ] = useState(0);
  const [eveningQ, setEveningQ] = useState(0);
  const [nightQ, setNightQ] = useState(0);

  const [text, setText] = useState("");
  const [drug, setDrug] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/inventory")
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });

    getPrescriptions();
    patientDetails();
  }, []);

  const addToPres = async (e) => {
    e.preventDefault();
    setText(
      `${text}\n  ${drug} [ ${beforAfter} Meal ] (Price: $${price}) :\n\t Morning - ${morningQ} \n\t Evening - ${eveningQ} \n\t Night - ${nightQ} \n`
    );
    alert("Prescription added!");
  };

  const patientDetails = async () => {
    axios
      .get(`http://localhost:8070/patient/get/${apt.patient}`)
      .then((res) => {
        setPatient(res.data.patient);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  const getPrescriptions = async () => {
    axios
      .get(`http://localhost:8070/prescription/appointmentPrescriptions/${apt._id}`)
      .then((res) => {
        setPrescriptions(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBeforeAndAfter = (e) => {
    setBeforeAfter(e.target.value);
  };

  const generatePres = (e) => {
    e.preventDefault();

    const newPrescription = {
      text,
      apt,
      pid,
    };

    axios
      .post("http://localhost:8070/prescription/add", newPrescription)
      .then(() => {
        alert("Prescription added!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const markConsulted = () => {
    axios
      .put(`http://localhost:8070/appointment/markConsulted/${apt._id}`)
      .then(() => {
        alert("Appointment marked as consulted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function downloadProfile() {
    const doc = new jsPDF();
    const margin = 10;

    const text = `\n\nPatient Report \n\n
      Name : ${patient.firstName}  ${patient.lastName} \n
      Date of Birth : ${new Date(patient.dob).toDateString()} \n
      Email : ${patient.email} \n
      Gender : ${patient.gender}\n
      Height : ${patient.height} \n
      Weight : ${patient.weight} \n
      Phone : ${patient.phoneNo}\n
      Blood Group : ${patient.bloodGroup}\n
      Civil Status : ${patient.civilStatus} \n
      Medical Status : ${patient.medicalStatus}\n
      Emergency Phone : ${patient.emergencyPhone}\n
      Guardian Name : ${patient.guardianName}\n
      Guardian NIC : ${patient.guardianNIC}\n
      Guardian Phone No : ${patient.guardianPhone}\n
      Insurance No : ${patient.insuranceNo} \n
      Insurance Company : ${patient.insuranceCompany} \n`;

    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
    doc.text(splitText, 10, 60);

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const canvas1 = document.createElement("canvas");
    canvas1.width = logo.width;
    canvas1.height = logo.height;
    const ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
    const dataURL1 = canvas1.toDataURL("image/png");

    doc.addImage(dataURL1, "PNG", 5, 5, pdfWidth / 4, (pdfWidth / 4) * (logo.height / logo.width));
    doc.text("Helasuwa.lk \nTel: 0771231231 \nAddress: No:11, Kandy road", pdfWidth / 4 + 15, 20);

    doc.save(`${patient._id}.pdf`);
  }

  const handleDrugChange = (e) => {
    const selectedDrug = e.target.value;
    setDrug(selectedDrug);

    const selectedItem = inventory.find((item) => item.item_name === selectedDrug);
    setPrice(selectedItem ? selectedItem.price : 0);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto my-6 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold">Appointment ID: {apt._id}</h3>
        <p className="text-gray-700">Patient Name: {patient.firstName} {patient.lastName}</p>
        <p className="text-gray-700">Appointment No: {apt.appointmentNo}</p>
        <button
          onClick={downloadProfile}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          View Patient Details
        </button>
      </div>

      <div>
        <textarea
          className="w-full p-3 border rounded-md text-gray-800"
          rows="6"
          placeholder="Prescription text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <div className="space-y-4">
        <select
          className="w-full p-3 border rounded-md text-gray-800"
          placeholder="Medicine Name"
          value={drug}
          onChange={handleDrugChange}
        >
          <option value="" disabled>Select Medicine</option>
          {inventory.map((item) => (
            <option key={item.item_id} value={item.item_name}>{item.item_name}</option>
          ))}
        </select>

        <input
          type="text"
          className="w-full p-3 border rounded-md text-gray-800"
          placeholder="Price"
          value={price > 0 ? `$${price}` : ""}
          readOnly
        />

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            name="befoAfter"
            value="Before"
            checked={beforAfter === "Before"}
            onChange={handleBeforeAndAfter}
            className="mr-1"
          />
          <label>Before Meal</label>
          <input
            type="radio"
            name="befoAfter"
            value="After"
            checked={beforAfter === "After"}
            onChange={handleBeforeAndAfter}
            className="mr-1"
          />
          <label>After Meal</label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={morning}
              onChange={() => setMorning(!morning)}
            />
            <label>Morning</label>
            <input
              type="number"
              placeholder="Qty"
              value={morning ? morningQ : 0}
              disabled={!morning}
              onChange={(e) => setMorningQ(e.target.value)}
              className="w-16 p-2 border rounded-md text-gray-800"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={evening}
              onChange={() => setEvening(!evening)}
            />
            <label>Evening</label>
            <input
              type="number"
              placeholder="Qty"
              value={evening ? eveningQ : 0}
              disabled={!evening}
              onChange={(e) => setEveningQ(e.target.value)}
              className="w-16 p-2 border rounded-md text-gray-800"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={night}
              onChange={() => setNight(!night)}
            />
            <label>Night</label>
            <input
              type="number"
              placeholder="Qty"
              value={night ? nightQ : 0}
              disabled={!night}
              onChange={(e) => setNightQ(e.target.value)}
              className="w-16 p-2 border rounded-md text-gray-800"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={generatePres}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Generate Prescription
          </button>
          <button
            onClick={addToPres}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add To Prescription
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Prescriptions</h2>
        {prescriptions.map((item) => (
          <SinglePrescription key={item._id} prescription={item} />
        ))}
      </div>

      <div>
        {apt.consulted ? (
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed">Consulted</button>
        ) : (
          <button
            onClick={markConsulted}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Mark as Consulted
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleAppointment;
