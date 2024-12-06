import React from "react";

const SidebarAndToolbar = () => {
  return (
    <div className="absolute left-0 top-16 flex flex-col p-2 bg-gray-900 text-white">
      <button className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600">
        Move
      </button>
      <button className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600">
        Zoom In
      </button>
      <button className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600">
        Zoom Out
      </button>
      <button className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600">
        Reset
      </button>
    </div>
  );
};

export default SidebarAndToolbar;
