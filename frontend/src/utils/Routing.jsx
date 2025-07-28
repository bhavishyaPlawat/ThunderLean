import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import TdeeCalculator from "../Components/TdeeCalculator"; // Add this import

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tdee-calculator" element={<TdeeCalculator />} />{" "}
      {/* Add this line */}
    </Routes>
  );
};

export default Routing;
