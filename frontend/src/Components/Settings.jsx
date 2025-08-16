// frontend/src/Components/Settings.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { supabase } from "../supabaseClient";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoChevronForward,
  IoSaveOutline,
  IoClose,
  // Import Strava Icon
} from "react-icons/io5";
import { SiStrava } from "react-icons/si";

import { motion, AnimatePresence } from "framer-motion";
import Popup from "./popup";
import AvatarModal from "./AvatarModal";

// --- INTERNAL MODAL COMPONENTS (No changes here) ---

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-sm w-full relative">
        <h2 className="text-xl text-white font-bold text-center mb-4">
          Confirm Log Out
        </h2>
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

const ProfileModal = ({
  isOpen,
  onClose,
  profile,
  setProfile,
  handleUpdate,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1E1E1E] rounded-2xl p-6 max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Edit Profile
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Form inputs remain the same */}
            <div>
              <label className="text-sm text-white">Name</label>
              <input
                type="text"
                value={profile?.full_name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                className="w-full p-2 text-white bg-gray-800 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Age</label>
              <input
                type="number"
                value={profile?.age || ""}
                onChange={(e) =>
                  setProfile({ ...profile, age: e.target.value })
                }
                className="w-full p-2 text-white bg-gray-800 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Height (cm)</label>
              <input
                type="number"
                value={profile?.height || ""}
                onChange={(e) =>
                  setProfile({ ...profile, height: e.target.value })
                }
                className="w-full p-2 text-white bg-gray-800 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Weight (kg)</label>
              <input
                type="number"
                value={profile?.weight || ""}
                onChange={(e) =>
                  setProfile({ ...profile, weight: e.target.value })
                }
                className="w-full p-2 text-white bg-gray-800 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Gender</label>
              <input
                type="text"
                value={profile?.gender || ""}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="w-full p-2 text-white bg-gray-800 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <IoSaveOutline size={22} />
              <span>Save Changes</span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ManageListItem = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-800 rounded-lg transition-colors"
  >
    <div className="p-2 bg-gray-700 rounded-lg">{icon}</div>
    <div className="flex-grow">
      <p className="font-bold text-white">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <IoChevronForward className="text-gray-500 h-5 w-5" />
  </button>
);

// --- MAIN SETTINGS COMPONENT ---

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname.split("/")[1] || "settings";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // --- START: STRAVA INTEGRATION ---
  useEffect(() => {
    const handleStravaCallback = async (code) => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "strava-callback",
          {
            body: { code },
          }
        );

        if (error) throw error;

        setPopup({ show: true, message: data.message, type: "success" });
        // Clean the URL by removing the code and scope parameters
        navigate("/settings", { replace: true });
      } catch (err) {
        setPopup({
          show: true,
          message: err.message || "Failed to connect Strava.",
          type: "error",
        });
        navigate("/settings", { replace: true });
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    // If a 'code' is present in the URL, it's a callback from Strava
    if (code) {
      handleStravaCallback(code);
    }
  }, [location, navigate]);

  const handleConnectStrava = () => {
    // IMPORTANT: Make sure you add VITE_STRAVA_CLIENT_ID to your .env file
    const stravaClientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = window.location.origin + "/settings";
    const scope = "read,activity:read_all";

    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${stravaClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;

    window.location.href = stravaAuthUrl;
  };
  // --- END: STRAVA INTEGRATION ---

  const fetchProfile = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user.id);

      if (error) {
        setPopup({
          show: true,
          message: "Error updating profile.",
          type: "error",
        });
      } else {
        setPopup({
          show: true,
          message: "Profile updated successfully.",
          type: "success",
        });
        setIsProfileModalOpen(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#121212] items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {popup.show && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup({ ...popup, show: false })}
          />
        )}
      </AnimatePresence>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        setProfile={setProfile}
        handleUpdate={handleUpdate}
      />

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onAvatarUpdate={fetchProfile}
      />

      <div className="flex h-screen bg-[#121212] overflow-hidden">
        <Sidebar activePage={activePage} />

        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-3xl mx-auto">
            <section className="flex flex-col items-center text-center mb-10">
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="w-24 h-24 rounded-full mb-4 ring-4 ring-purple-600 p-1 group relative"
              >
                <img
                  src={
                    profile?.avatar_url ||
                    "https://api.dicebear.com/8.x/adventurer/svg?seed=default"
                  }
                  alt={profile?.full_name}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-bold">Edit</p>
                </div>
              </button>
              <h1 className="text-2xl font-bold text-white">
                {profile?.full_name || "User"}
              </h1>
            </section>

            {profile?.goal?.type && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-4">Your Goal</h2>
                <div className="bg-[#1E1E1E] p-6 rounded-xl text-center">
                  <p className="text-lg text-green-400 font-bold">
                    {profile.goal.type}
                  </p>
                  {profile.goal.amount && profile.goal.timeframe && (
                    <p className="text-gray-300">
                      {profile.goal.amount} kg in {profile.goal.timeframe} weeks
                    </p>
                  )}
                </div>
              </section>
            )}

            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Manage</h2>
              <div className="bg-[#1E1E1E] p-2 rounded-xl space-y-1">
                <ManageListItem
                  icon={
                    <IoPersonCircleOutline className="text-green-400 h-6 w-6" />
                  }
                  title="Profile"
                  description="View and edit your profile details"
                  onClick={() => setIsProfileModalOpen(true)}
                />
                {/* --- START: STRAVA BUTTON RENDER --- */}
                <ManageListItem
                  icon={<SiStrava className="text-orange-500 h-6 w-6" />}
                  title={
                    profile?.strava_access_token
                      ? "Strava Connected"
                      : "Connect to Strava"
                  }
                  description={
                    profile?.strava_access_token
                      ? "Your activities will sync automatically"
                      : "Sync your workout activities"
                  }
                  onClick={handleConnectStrava}
                />
                {/* --- END: STRAVA BUTTON RENDER --- */}
              </div>
            </section>

            <section className="text-center">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center justify-center w-full max-w-xs mx-auto space-x-2 bg-gray-800  text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
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
