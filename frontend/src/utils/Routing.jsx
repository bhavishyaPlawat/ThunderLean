import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import TdeeCalculator from "../Components/TdeeCalculator";
import AiTrack from "../Components/aiTrack";
import GetTip from "../Components/GetTip";
import Auth from "../Components/Auth";
import ProtectedRoute from "../Components/ProtectedRoute";
import ForgotPassword from "../Components/ForgotPassword";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />;
      <Route
        path="/tdee-calculator"
        element={
          <ProtectedRoute>
            <TdeeCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-track"
        element={
          <ProtectedRoute>
            <AiTrack />
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-tip"
        element={
          <ProtectedRoute>
            <GetTip />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
