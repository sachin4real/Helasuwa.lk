import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleChannel = ({ channel }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPatientNo();
  }, [channel._id]);

  const getPatientNo = async () => {
    try {
      const res = await axios.get(`http://localhost:8070/channel/NoOfAppointments/${channel._id}`);
      setCount(res.data.count);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h5 className="font-bold text-lg mb-2">Doctor: {channel.drName}</h5>
      <p className="text-sm text-gray-600 mb-2">Specialized In: {channel.specialization}</p>
      <p className="text-sm text-gray-600 mb-2">{new Date(channel.startDateTime).toString()}</p>
      <p className="text-sm text-gray-600 mb-4">
        Available Spots: {parseInt(channel.maxPatients) - parseInt(count)}
      </p>

      <div>
        {channel.maxPatients === count ? (
          <button className="bg-red-500 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
            Appointment Full
          </button>
        ) : (
          <a href={`/makeApt/${channel._id}`}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Make Appointment</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleChannel;
