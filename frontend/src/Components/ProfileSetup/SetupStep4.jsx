// frontend/src/Components/ProfileSetup/SetupStep4.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const genders = ["Male", "Female", "Other"];

const SetupStep4 = ({ nextStep, prevStep, updateForm }) => {
  const [gender, setGender] = useState("");

  const handleNext = () => {
    updateForm({ gender });
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
        What is your gender?
      </h2>
      <div className="flex justify-around mb-6">
        {genders.map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              gender === g
                ? "bg-purple-600 text-white"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!gender}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default SetupStep4;
