import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

// --- ICON COMPONENTS ---

const LogoIcon = ({ onGoHome, className }) => (
  <div
    className={`flex items-center space-x-3 cursor-pointer font-sans ${className}`}
    onClick={onGoHome}
  >
    <div className="bg-green-600 p-1 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>
    <span className="font-bold text-xl text-white select-none">
      THUNDERLEAN
    </span>
  </div>
);

const HomeIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-white" : "text-gray-400"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const DashboardIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-white" : "text-gray-400"
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
      active ? "text-white" : "text-gray-400"
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
      active ? "text-white" : "text-gray-400"
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
            active ? "text-white" : "text-gray-400"
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
        active ? "text-white" : "text-gray-400"
      }`} />
)


const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { slug: "home", icon: HomeIcon, label: "Home" },
    { slug: "dashboard", icon: DashboardIcon, label: "Dashboard" },
    { slug: "food-log", icon: FoodLogIcon, label: "Food Log" },
    { slug: "exercise-log", icon: ExerciseLogIcon, label: "Exercise Log" },
    { slug: "community", icon: CommunityIcon, label: "Community" },
  ];

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleNavigate = (slug) => {
    navigate(`/${slug}`);

    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="md:hidden p-4 fixed top-0 left-0 z-30">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200">
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <aside
        className={`w-64 min-h-screen p-6 flex-shrink-0 flex flex-col z-20 transition-transform duration-300 ease-in-out bg-[#1E1E1E]
          fixed transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:top-0 md:translate-x-0`}
      >
        <div className="md:hidden">
          <button onClick={() => setIsOpen(false)} className="text-gray-300">
            <BsChevronLeft size={24} />
          </button>
        </div>
        <LogoIcon onGoHome={handleGoHome} className="mb-12 mt-2 md:mt-0" />
        
        <nav className="flex flex-col flex-grow space-y-2">
          {navItems.map(({ slug, icon: Icon, label }) => {
            const isActive = slug === activePage;
            return (
              <button
                key={slug}
                onClick={() => handleNavigate(slug)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white font-bold shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon active={isActive} />
                <span className="font-semibold">{label}</span>
              </button>
            );
          })}
          {/* Settings button pushed to the bottom */}
          <div className="mt-auto">
             <button
                onClick={() => handleNavigate('settings')}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
                  activePage === 'settings'
                    ? "bg-green-600 text-white font-bold shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <SettingsIcon active={activePage === 'settings'} />
                <span className="font-semibold">Settings</span>
              </button>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;