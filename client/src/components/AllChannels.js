// AllChannels.js
import React from "react";
import SingleChannel from "./SingleChannel";

const AllChannels = ({ channels }) => {
  return (
    <div>
      <h1 className="heading-channels">All Channels</h1>
      <div className="channels-container">
        {channels.map((item) => (
          <SingleChannel channel={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default AllChannels;
