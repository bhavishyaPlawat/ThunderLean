// frontend/src/Components/ProfileSetup/SetupStep3.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const SetupStep3 = ({ nextStep, prevStep, updateForm }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleNext = () => {
    updateForm({ height, weight });
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
        What are your measurements?
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your height"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your weight"
        />
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
          disabled={!height || !weight}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default SetupStep3;
