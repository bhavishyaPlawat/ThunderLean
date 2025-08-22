// frontend/src/Components/Spinner.jsx
import React from "react";
import { IoSyncOutline } from "react-icons/io5";

const Spinner = ({ size = "h-8 w-8", color = "text-white" }) => {
  return (
    <div className="flex justify-center items-center">
      <IoSyncOutline className={`animate-spin ${size} ${color}`} />
    </div>
  );
};

export default Spinner;
