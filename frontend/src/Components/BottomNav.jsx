import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline, IoPeopleOutline } from 'react-icons/io5';

// Icon Components
const HomeIcon = ({ active }) => (
  <IoPeopleOutline className={`h-6 w-6 transition-colors ${
       active ? "text-green-500" : "text-gray-400"
     }`} />
);

const DashboardIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-green-500" : "text-gray-400"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const FoodLogIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-green-500" : "text-gray-400"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const ExerciseLogIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-green-500" : "text-gray-400"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10a4 4 0 11-8 0 4 4 0 018 0zm-4 9a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM3 10a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
    />
  </svg>
);

const CommunityIcon = ({ active }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 transition-colors ${
            active ? "text-green-500" : "text-gray-400"
        }`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" />
    </svg>
);

const SettingsIcon = ({ active }) => (
    <IoSettingsOutline className={`h-6 w-6 transition-colors ${
        active ? "text-green-500" : "text-gray-400"
      }`} />
);

const NavItem = ({ slug, label, icon: Icon, activePage, navigate }) => {
  const isActive = slug === activePage;
  return (
    <button
      onClick={() => navigate(`/${slug}`)}
      className="flex flex-col items-center justify-center flex-1 space-y-1 focus:outline-none"
    >
      <Icon active={isActive} />
      <span className={`text-xs font-medium ${isActive ? "text-green-500" : "text-gray-400"}`}>
        {label}
      </span>
    </button>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split("/")[1] || "home";

  const navItems = [
    { slug: "home", icon: HomeIcon, label: "Home" },
    { slug: "dashboard", icon: DashboardIcon, label: "Dashboard" },
    { slug: "food-log", icon: FoodLogIcon, label: "Food Log" },
    { slug: "exercise-log", icon: ExerciseLogIcon, label: "Exercise" },
    { slug: "community", icon: CommunityIcon, label: "Community" },
    { slug: "settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-gray-700/50 z-30">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavItem key={item.slug} {...item} activePage={activePage} navigate={navigate} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;