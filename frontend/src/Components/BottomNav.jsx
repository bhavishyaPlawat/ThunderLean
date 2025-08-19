import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoSettingsOutline,
  IoPeopleOutline,
  IoClose,
  IoFastFoodOutline,
  IoBarbellOutline,
  IoChevronForward,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// --- REUSABLE ICON COMPONENTS ---

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

const HomeIcon = ({ active }) => (
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
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const CommunityIcon = ({ active }) => (
  <IoPeopleOutline
    className={`h-6 w-6 transition-colors ${
      active ? "text-green-500" : "text-gray-400"
    }`}
  />
);

const SettingsIcon = ({ active }) => (
  <IoSettingsOutline
    className={`h-6 w-6 transition-colors ${
      active ? "text-green-500" : "text-gray-400"
    }`}
  />
);

const NavItem = ({ slug, label, icon: Icon, activePage, navigate }) => {
  const isActive = slug === activePage;
  return (
    <button
      onClick={() => navigate(`/${slug}`)}
      className="flex flex-col items-center justify-center flex-1 space-y-1 focus:outline-none"
    >
      <Icon active={isActive} />
      <span
        className={`text-xs font-medium ${
          isActive ? "text-green-500" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

// --- NEW MODAL COMPONENT ---

const AddLogModal = ({ isOpen, onClose, onNavigate }) => {
  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  const modalItems = [
    { name: "Food", icon: <IoFastFoodOutline className="text-green-400 h-6 w-6" />, path: "/food-log" },
    { name: "Workout", icon: <IoBarbellOutline className="text-green-400 h-6 w-6" />, path: "/exercise-log" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 bg-[#282828] rounded-t-2xl p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">What Would You Like to Track?</h3>
              <button onClick={onClose} className="p-2 bg-gray-700 rounded-full">
                <IoClose className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="space-y-3">
              {modalItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.path)}
                  className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-gray-800 rounded-lg">{item.icon}</div>
                  <p className="flex-grow font-semibold text-white">{item.name}</p>
                  <IoChevronForward className="text-gray-500 h-5 w-5" />
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// --- UPDATED BOTTOMNAV COMPONENT ---
const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split("/")[1] || "home";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leftNavItems = [
    { slug: "home", icon: HomeIcon, label: "Home" },
    { slug: "dashboard", icon: DashboardIcon, label: "Dashboard" },
  ];
  const rightNavItems = [
    { slug: "community", icon: CommunityIcon, label: "Community" },
    { slug: "settings", icon: SettingsIcon, label: "Settings" },
  ];

  const handleModalNavigate = (path) => {
    navigate(path);
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1E1E1E] border-t border-gray-700/50 z-30">
        <div className="relative w-full h-full flex items-center">
          <div className="flex justify-around items-center w-full px-2">
            {leftNavItems.map((item) => (
              <NavItem key={item.slug} {...item} activePage={activePage} navigate={navigate} />
            ))}
            <div className="flex-1" /> {/* Spacer for the central button */}
            {rightNavItems.map((item) => (
              <NavItem key={item.slug} {...item} activePage={activePage} navigate={navigate} />
            ))}
          </div>

          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AddLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNavigate={handleModalNavigate} />
    </>
  );
};

export default BottomNav;