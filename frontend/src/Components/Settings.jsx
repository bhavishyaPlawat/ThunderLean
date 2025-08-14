import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { supabase } from "../supabaseClient";
import {
  IoPersonCircleOutline,
  IoRibbonOutline,
  IoPhonePortraitOutline,
  IoLogOutOutline,
  IoChevronForward,
  IoClose,
} from "react-icons/io5";

const AchievementBadge = ({ imageUrl, alt }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-700">
    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ManageListItem = ({ icon, title, description }) => (
  <button className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-800 rounded-lg transition-colors">
    <div className="p-2 bg-gray-700 rounded-lg">{icon}</div>
    <div className="flex-grow">
      <p className="font-bold text-white">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <IoChevronForward className="text-gray-500 h-5 w-5" />
  </button>
);

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-sm w-full relative">
        <h2 className="text-xl font-bold text-center mb-4">Confirm Log Out</h2>
        <p className="text-center text-gray-400 mb-6">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split("/")[1] || "settings";
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const userData = {
    name: "Sophia Carter",
    level: 3,
    joined: 2021,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
  };

  const achievements = [
    {
      id: 1,
      alt: "10k Steps Badge",
      imageUrl: "https://i.imgur.com/L12wV3t.png",
    },
    {
      id: 2,
      alt: "Marathon Finisher Badge",
      imageUrl: "https://i.imgur.com/gAm7y4c.png",
    },
    {
      id: 3,
      alt: "Healthy Eater Badge",
      imageUrl: "https://i.imgur.com/u59sU8G.png",
    },
    {
      id: 4,
      alt: "Consistent Logger Badge",
      imageUrl: "https://i.imgur.com/qgW6n3U.png",
    },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex h-screen bg-[#121212] overflow-hidden">
        <Sidebar activePage={activePage} />

        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-3xl mx-auto">
            <section className="flex flex-col items-center text-center mb-10">
              <div className="w-24 h-24 rounded-full mb-4 ring-4 ring-green-600 p-1">
                <img
                  src={userData.avatarUrl}
                  alt={userData.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
              <p className="text-gray-400">
                Level {userData.level} &bull; Joined {userData.joined}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <div className="bg-[#1E1E1E] p-5 rounded-xl flex justify-center space-x-4">
                {achievements.map((badge) => (
                  <AchievementBadge
                    key={badge.id}
                    imageUrl={badge.imageUrl}
                    alt={badge.alt}
                  />
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Manage</h2>
              <div className="bg-[#1E1E1E] p-2 rounded-xl space-y-1">
                <ManageListItem
                  icon={
                    <IoPersonCircleOutline className="text-green-400 h-6 w-6" />
                  }
                  title="Profile"
                  description="View and edit your profile details"
                />
                <ManageListItem
                  icon={<IoRibbonOutline className="text-green-400 h-6 w-6" />}
                  title="Goals"
                  description="Set and track your fitness goals"
                />
                <ManageListItem
                  icon={
                    <IoPhonePortraitOutline className="text-green-400 h-6 w-6" />
                  }
                  title="Devices"
                  description="Connect and manage your devices"
                />
              </div>
            </section>

            <section className="text-center">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center justify-center w-full max-w-xs mx-auto space-x-2 bg-gray-800 text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
              >
                <IoLogOutOutline size={22} />
                <span>Log Out</span>
              </button>
            </section>
          </div>
        </main>
      </div>
      <BottomNav />
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Settings;
