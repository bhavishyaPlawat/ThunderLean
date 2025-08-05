import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsList, BsChevronLeft } from 'react-icons/bs';

// --- ICON COMPONENTS ---
const LogoIcon = ({ onGoHome, className }) => (
  <div
    className={`flex items-center space-x-2 cursor-pointer font-body ${className}`}
    onClick={onGoHome}
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-blue-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
    <span className="font-bold text-xl text-black select-none">
      THUNDERLEAN 
    </span>
  </div>
);

const DashboardIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-pink-600" : "text-gray-600"
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

const CalculatorIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-pink-600" : "text-gray-600"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const AiTrackIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-pink-600" : "text-gray-600"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const TipIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-colors ${
      active ? "text-pink-600" : "text-gray-600"
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { slug: "dashboard", icon: DashboardIcon, label: "Dashboard" },
    { slug: "tdee-calculator", icon: CalculatorIcon, label: "TDEE Calculator " },
    { slug: "ai-track", icon: AiTrackIcon, label: "AI Track" },
    { slug: "get-tip", icon: TipIcon, label: "Get free Tip" },
  ];

  const handleGoHome = () => {
    navigate("/");
  };

  const handleNavigate = (slug) => {
    navigate(`/${slug}`);

    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* The classes here have been updated to fix the height and scrolling issue */}
      <aside
        className={`w-64 h-screen p-6 flex-shrink-0 flex flex-col z-20 transition-transform duration-300 ease-in-out
          fixed transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:top-0 md:translate-x-0`}
        style={{
          background: "linear-gradient(90deg, #879AE3 0%, #C5D5F2 100%)",
        }}
      >

     <div className="md:hidden ">
  <button onClick={() => setIsOpen(false)}>
    <BsChevronLeft size={24} />
  </button>
</div>
        <br/>
        <LogoIcon onGoHome={handleGoHome} className="mb-12" />
        <nav className="space-y-4">
          {navItems.map(({ slug, icon: Icon, label }) => {
            const isActive = slug === activePage;
            const activeBgColor =
              slug === "tdee-calculator" ? "bg-pink-200" : "bg-purple-200";
            const activeTextColor =
              slug === "tdee-calculator" ? "text-gray-900" : "text-pink-800";

            return (
              <button
                key={slug}
                onClick={() => handleNavigate(slug)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
                  isActive
                    ? `${activeBgColor} ${activeTextColor} font-bold shadow-inner`
                    : "hover:bg-white/20 text-black"
                }`}
              >
                <Icon active={isActive} />
                <span className="font-semibold">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
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
