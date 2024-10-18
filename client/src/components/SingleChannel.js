// SingleChannel.js
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
    <div className="channel-container-doctor">
      <div>
        <h5>Doctor: {channel.drName}</h5>
        <h5>Specialized In: {channel.specialization}</h5>
        <h5>{new Date(channel.startDateTime).toString()}</h5>
        <h5>
          Available Spots: {parseInt(channel.maxPatients) - parseInt(count)}
        </h5>
      </div>

      <div>
        {channel.maxPatients === count ? (
          <button id="make-apt-btn" disabled>
            Appointment Full
          </button>
        ) : (
          <a href={`/makeApt/${channel._id}`}>
            <button id="make-apt-btn">Make Appointment</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleChannel;
