import React from "react";
import { Routes, Route } from "react-router-dom";

// Component Imports (with corrected naming)
import LandingPage from "../Components/LandingPage"; // Renamed from Home
import Home from "../Components/Home";             // This is now the main authenticated home
import Dashboard from "../Components/Dashboard";
import TdeeCalculator from "../Components/TdeeCalculator";
import AiTrack from "../Components/AiTrack";         // Corrected casing from aiTrack
import GetTip from "../Components/GetTip";
import Auth from "../Components/Auth";
import ProtectedRoute from "../Components/ProtectedRoute";
import ForgotPassword from "../Components/ForgotPassword";
import FoodLog from "../Components/FoodLog";
import ExerciseLog from "../Components/ExerciseLog";
import Community from "../Components/Community";
import Settings from "../Components/Settings";
const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes (for logged-in users) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/tdee-calculator"
        element={
          <ProtectedRoute>
            <TdeeCalculator />
          </ProtectedRoute>
        }
      />
       <Route
        path="/food-log"
        element={
          <ProtectedRoute>
            <FoodLog />
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
        path="/exercise-log"
        element={
          <ProtectedRoute>
            <ExerciseLog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default Routing;