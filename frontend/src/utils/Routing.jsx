import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Routing;
