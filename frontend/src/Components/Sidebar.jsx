import React from "react";
import { useNavigate } from "react-router-dom";

// --- ICON COMPONENTS ---
const LogoIcon = ({ onGoHome, className }) => (
  <div className={`flex items-center space-x-2 cursor-pointer ${className}`} onClick={onGoHome}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <span className="font-bold text-xl text-black select-none">THUNDERLEAN</span>
  </div>
);

const DashboardIconSidebar = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? "text-pink-400" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

// Define other icons similarly...

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const navItems = [
    { slug: "dashboard", icon: DashboardIconSidebar, label: "Dashboard" },
    { slug: "tdee-calculator", icon: DashboardIconSidebar /* Replace with actual */, label: "TDEE Calculator" },
    { slug: "ai-track", icon: DashboardIconSidebar /* Replace */, label: "AI Track" },
    { slug: "get-tip", icon: DashboardIconSidebar /* Replace */, label: "Get free Tip" },
  ];

  const handleGoHome = () => {
    navigate("/");
  };

  const handleNavigate = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <aside
      className="w-64 h-screen p-6 flex-shrink-0 flex flex-col"
      style={{ background: "linear-gradient(90deg, #879AE3 0%, #C5D5F2 100%)" }}
    >
      <LogoIcon onGoHome={handleGoHome} className="mb-12" />
      <nav className="space-y-4">
        {navItems.map(({ slug, icon: Icon, label }) => {
          const isActive = slug === activePage;
          return (
            <button
              key={slug}
              onClick={() => handleNavigate(slug)}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg w-full text-left transition ${
                isActive ? "bg-pink-500/20 border border-pink-400 text-black" : "hover:bg-white/10 text-black"
              }`}
            >
              <Icon active={isActive} />
              <span className="font-semibold">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
