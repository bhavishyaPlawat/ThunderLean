import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";

// Lazy load components
const LandingPage = lazy(() => import("../Components/LandingPage"));
const Home = lazy(() => import("../Components/Home"));
const Dashboard = lazy(() => import("../Components/Dashboard"));
const Auth = lazy(() => import("../Components/Auth"));
const ForgotPassword = lazy(() => import("../Components/ForgotPassword"));
const FoodLog = lazy(() => import("../Components/FoodLog"));
const ExerciseLog = lazy(() => import("../Components/ExerciseLog"));
const Community = lazy(() => import("../Components/Community"));
const Settings = lazy(() => import("../Components/Settings"));
const ResetPassword = lazy(() => import("../Components/ResetPassword"));
const ProfileSetup = lazy(() => import("../Components/ProfileSetup/ProfileSetup"));

const publicRoutes = [
  { path: "/", element: LandingPage },
  { path: "/auth", element: Auth },
  { path: "/forgot-password", element: ForgotPassword },
  { path: "/reset-password", element: ResetPassword },
];

const protectedRoutes = [
  { path: "/profile-setup", element: ProfileSetup },
  { path: "/home", element: Home },
  { path: "/dashboard", element: Dashboard },
  { path: "/food-log", element: FoodLog },
  { path: "/exercise-log", element: ExerciseLog },
  { path: "/community", element: Community },
  { path: "/settings", element: Settings },
];

const Routing = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {publicRoutes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        {protectedRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Routing;
