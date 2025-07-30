import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import TdeeCalculator from "../Components/TdeeCalculator";
// CORRECT
import AiTrack from "../Components/aiTrack";
import GetTip from "../Components/GetTip"; // 1. Import the new component

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tdee-calculator" element={<TdeeCalculator />} />
      <Route path="/ai-track" element={<AiTrack />} />
      <Route path="/get-tip" element={<GetTip />} />{" "}
      {/* 2. Add the new route */}
    </Routes>
  );
};

export default Routing;
