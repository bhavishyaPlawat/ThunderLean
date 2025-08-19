// frontend/src/Components/ProfileSetup/SetupStep2.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const SetupStep2 = ({ nextStep, prevStep, updateForm }) => {
  const [age, setAge] = useState("");

  const handleNext = () => {
    updateForm({ age });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">How old are you?</h2>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 mb-6"
        placeholder="Enter your age"
      />
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!age}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default SetupStep2;
