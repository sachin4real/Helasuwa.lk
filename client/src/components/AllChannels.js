import React from "react";
import SingleChannel from "./SingleChannel";

const AllChannels = ({ channels }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Channels</h1>

      {/* Grid layout for the channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {channels.map((item) => (
          <SingleChannel channel={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default AllChannels;
