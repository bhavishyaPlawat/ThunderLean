// frontend/src/Components/ProfileSetup/SetupStep1.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const avatars = [
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Mittens",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Sheba",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Gizmo",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Pepper",
];

const SetupStep1 = ({ nextStep, updateForm }) => {
  const [avatar, setAvatar] = useState(avatars[0]);

  const handleNext = () => {
    updateForm({ avatar_url: avatar });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome! Let's get you set up.
      </h2>
      <div className="mb-8">
        <label className="block text-sm font-medium mb-4 text-center text-gray-400">
          Choose an Avatar
        </label>
        <div className="flex justify-around">
          {avatars.map((src) => (
            <img
              key={src}
              src={src}
              alt="avatar"
              onClick={() => setAvatar(src)}
              className={`w-20 h-20 rounded-full cursor-pointer transition-all ${
                avatar === src
                  ? "ring-4 ring-purple-500 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700"
      >
        Next
      </button>
    </motion.div>
  );
};

export default SetupStep1;
