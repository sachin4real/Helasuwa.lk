import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import SingleAppointment from '../../pages/Doctor/SingleAppointment';

const ViewChannel = () => {
  let { cid } = useParams();
  const [channel, setChannel] = useState([]);
  const [apts, setApts] = useState([]);

  const getChannel = async () => {
    axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getApts = async () => {
    axios
      .get(`http://localhost:8070/appointment/channelAppointments/${cid}`)
      .then((res) => {
        setApts(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getChannel();
    getApts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Channel Details</h2>
          <div className="mt-4 space-y-2">
            <h3 className="text-lg text-gray-600"><span className="font-medium">ID:</span> {channel._id}</h3>
            <h3 className="text-lg text-gray-600"><span className="font-medium">Doctor Name:</span> {channel.drName}</h3>
            <h3 className="text-lg text-gray-600">
              <span className="font-medium">Start Date & Time:</span> {new Date(channel.startDateTime).toString()}
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {apts.length > 0 ? (
            apts.map((apt, index) => <SingleAppointment key={index} apt={apt} />)
          ) : (
            <p className="text-gray-500">No appointments found for this channel.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewChannel;
