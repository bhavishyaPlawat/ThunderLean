// frontend/src/Components/ProfileSetup/SetupStep5.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const goals = ["Lose Weight", "Gain Weight", "Maintain Weight"];

const SetupStep5 = ({ submitProfile, prevStep, updateForm }) => {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [timeframe, setTimeframe] = useState("");

  const handleSubmit = () => {
    updateForm({ goal: { type: goal, amount, timeframe } });
    submitProfile();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        What is your primary goal?
      </h2>
      <div className="flex justify-around mb-6">
        {goals.map((g) => (
          <button
            key={g}
            onClick={() => setGoal(g)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              goal === g
                ? "bg-purple-600 text-white"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      {goal && goal !== "Maintain Weight" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              How many KGs?
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg"
              placeholder="e.g., 5"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              In how many weeks?
            </label>
            <input
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg"
              placeholder="e.g., 8"
            />
          </div>
        </>
      )}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!goal}
          className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          Finish
        </button>
      </div>
    </motion.div>
  );
};

export default SetupStep5;
