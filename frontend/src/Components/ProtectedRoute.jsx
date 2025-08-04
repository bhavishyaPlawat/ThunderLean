import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("userData");
    return token && user;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
