import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoGridOutline,
  IoAdd,
  IoSettingsOutline,
  IoPeopleOutline,
  IoClose,
  IoFastFoodOutline,
  IoBarbellOutline,
  IoChevronForward,
} from "react-icons/io5";

const NavItem = ({ slug, label, icon: Icon, activePage, navigate }) => {
  const isActive = slug === activePage;
  return (
    <button
      onClick={() => navigate(`/${slug}`)}
      className="flex flex-col items-center justify-center flex-1 space-y-1 focus:outline-none"
    >
      <Icon
        className={`h-6 w-6 transition-colors ${
          isActive ? "text-green-500" : "text-gray-400"
        }`}
      />
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

const AddMealOption = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-800 rounded-lg transition-colors"
  >
    <div className="p-3 bg-gray-700 rounded-lg">{icon}</div>
    <div className="flex-grow">
      <p className="font-bold text-white">{title}</p>
    </div>
    <IoChevronForward className="text-gray-500 h-5 w-5" />
  </button>
);

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split("/")[1] || "home";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { slug: "home", icon: IoHomeOutline, label: "Home" },
    { slug: "dashboard", icon: IoGridOutline, label: "Dashboard" },
    { slug: "community", icon: IoPeopleOutline, label: "Community" },
    { slug: "settings", icon: IoSettingsOutline, label: "Settings" },
  ];

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  const handleNavigateAndClose = (path) => {
    navigate(path);
    handleModalClose();
  }

  return (
    <>
      {/* Modal for Add Options */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={handleModalClose}
          ></div>
          <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
            <div className="bg-[#1E1E1E] rounded-2xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-white">What would you like to track?</h3>
                <button onClick={handleModalClose} className="p-2">
                    <IoClose className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2">
                <AddMealOption
                  icon={<IoFastFoodOutline className="text-green-400 h-6 w-6" />}
                  title="Food"
                  onClick={() => handleNavigateAndClose('/food-log')}
                />
                <AddMealOption
                  icon={<IoBarbellOutline className="text-green-400 h-6 w-6" />}
                  title="Exercise"
                  onClick={() => handleNavigateAndClose('/exercise-log')}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-gray-700/50 z-30">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Left Items */}
          <div className="flex justify-around w-2/5">
            <NavItem {...navItems[0]} activePage={activePage} navigate={navigate} />
            <NavItem {...navItems[1]} activePage={activePage} navigate={navigate} />
          </div>

          {/* Center Add Button */}
          <div className="w-1/5 flex justify-center">
            <button
              onClick={handleAddClick}
              className="w-16 h-16 -mt-8 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none"
            >
              <IoAdd size={32} />
            </button>
          </div>

          {/* Right Items */}
          <div className="flex justify-around w-2/5">
            <NavItem {...navItems[2]} activePage={activePage} navigate={navigate} />
            <NavItem {...navItems[3]} activePage={activePage} navigate={navigate} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;