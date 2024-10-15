import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorSidePanel from "./DoctorSidePanel";
import DoctorHeader from './DoctorHeader';

const EditChannel = (props) => {
  let { cid } = useParams();
  const [maxPatients, setMaxPatients] = useState(0);
  const [startDateTime, setStartDateTime] = useState("");

  const [channel, setChannel] = useState([]);

  function updateChannel(e) {
    e.preventDefault();
    const updatedChannel = {
      maxPatients,
      startDateTime,
    };
    axios
      .put(
        `http://localhost:8070/channel/update/${channel._id}`,
        updatedChannel
      )
      .then((res) => {
        alert("Channel updated!!");
        Window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getChannel = async () => {
    axios
      .get(`http://localhost:8070/channel/get/${cid}`)
      .then((res) => {
        setChannel(res.data.Channel);
        setMaxPatients(res.data.Channel.maxPatients);

        setStartDateTime(res.data.Channel.startDateTime);

        console.log(res.data.Channel);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getChannel();
  }, []);
  return (
    <div>
      <DoctorHeader />
      <div className="main-container">
      <DoctorSidePanel />
        <div className="content-container">
          <h1 className="heading-channels">Edit Channeling Time</h1>

          <form action="" onSubmit={updateChannel}>
            <div className="add-channel-form">
              <input
                type="text"
                value={channel.drName}
                readOnly
                className="add-form-input"
              />{" "}
              <br /> <br />
              <input
                className="add-form-input"
                type="number"
                placeholder="Maximun Patients"
                defaultValue={channel.maxPatients}
                onChange={(e) => {
                  setMaxPatients(e.target.value);
                }}
              />{" "}
              <br /> <br />
              <label htmlFor="">
                {new Date(startDateTime).toString()}
              </label>{" "}
              <br />
              <input
                className="add-form-input"
                type="datetime-local"
                name="endDate"
                id=""
                onChange={(e) => {
                  setStartDateTime(e.target.value);
                }}
              />{" "}
              <br /> <br />
              <button id="add-channel-btn" type="submt">
                Update and Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
