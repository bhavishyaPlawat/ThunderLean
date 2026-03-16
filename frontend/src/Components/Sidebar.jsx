import React from "react"
import { useNavigate } from "react-router-dom";
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
  };

  return (
    <>
      {/* Custom scrollbar styles */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .sidebar-nav-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .sidebar-nav-scroll {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
       <aside className="hidden md:flex w-64 h-screen p-6 flex-shrink-0 flex-col z-20 bg-[#1E1E1E] sticky top-0">
       <LogoIcon onGoHome={handleGoHome} className="mb-8 mt-2" />
        {/* Main navigation area */}
        <div className="flex-grow flex flex-col overflow-hidden">
          <nav className="flex-grow overflow-y-auto sidebar-nav-scroll pr-2 space-y-2">
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
          </nav>
          
          {/* Settings button at the bottom */}
          <div className="pt-4 mt-auto border-t border-gray-700/50">
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
        </div>
      </aside>     
    </>
  );
};

export default Sidebar;
