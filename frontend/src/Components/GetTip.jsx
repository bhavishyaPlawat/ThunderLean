import React, { useState } from "react";
// CORRECT
import Sidebar from "./sidebar";
import { RiLightbulbFlashLine, RiLoader4Line } from "react-icons/ri";

const GetTip = () => {
  const [userInput, setUserInput] = useState("");
  const [generatedTip, setGeneratedTip] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickGoals = [
    "How can I lose weight?",
    "Best way to build muscle",
    "Tips for better sleep",
    "Healthy breakfast ideas",
  ];

  const handleGetTip = () => {
    if (!userInput) {
      setGeneratedTip("Please enter a question or select a goal first.");
      return;
    }
    setIsLoading(true);
    setGeneratedTip(""); // Clear previous tip

    // Simulate an API call
    setTimeout(() => {
      // In a real app, you would make a backend API call here with the userInput
      const exampleTip = `For your goal: "${userInput}", here's a tip: Consistency is key. Aim for at least 150 minutes of moderate-intensity exercise per week, combined with a balanced diet rich in whole foods. Make sure to stay hydrated by drinking plenty of water throughout the day. Small, sustainable changes lead to the best long-term results.`;
      setGeneratedTip(exampleTip);
      setIsLoading(false);
    }, 2000); // 2-second delay
  };

  const handleQuickGoalClick = (goal) => {
    setUserInput(goal);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      <Sidebar activePage="get-tip" />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <header className="bg-pink-200 text-gray-700 py-4 px-6 rounded-lg mb-8 text-center">
          <h2 className="text-lg font-bold tracking-widest uppercase">
            Get Personalized Tips
          </h2>
        </header>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Ask Anything, Get Smarter Advice
            </h3>
            <p className="text-gray-500 mt-2">
              Tell us your goal or ask a question to receive a personalized tip
              from our AI.
            </p>
          </div>

          {/* Quick Goals */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {quickGoals.map((goal, index) => (
              <button
                key={index}
                onClick={() => handleQuickGoalClick(goal)}
                className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:bg-purple-200 hover:text-purple-800 transition-colors"
              >
                {goal}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mb-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="For example: 'What are some good post-workout meals?'"
              className="w-full h-28 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Action Button */}
          <div className="text-center mb-6">
            <button
              onClick={handleGetTip}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RiLoader4Line className="animate-spin h-6 w-6" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <RiLightbulbFlashLine size={24} />
                  <span>Get Tip</span>
                </>
              )}
            </button>
          </div>

          {/* Result Display */}
          {generatedTip && (
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Your Tip:
              </h4>
              <p className="text-gray-700 leading-relaxed">{generatedTip}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GetTip;
