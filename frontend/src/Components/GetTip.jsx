import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { RiLightbulbFlashLine, RiLoader4Line } from "react-icons/ri";
import axios from "axios"; // Import axios for API calls
import ReactMarkdown from "react-markdown";

const GetTip = () => {
  const [userInput, setUserInput] = useState("");
  const [generatedTip, setGeneratedTip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const quickGoals = [
    "How can I lose weight?",
    "Best way to build muscle",
    "Tips for better sleep",
    "Healthy breakfast ideas",
  ];

  // --- UPDATED API CALL LOGIC ---
  const handleGetTip = async () => {
    if (!userInput.trim()) {
      setGeneratedTip("Please enter a question or select a goal first.");
      return;
    }
    setIsLoading(true);
    setGeneratedTip(""); // Clear previous tip

    try {
      // Make a real API call to your backend
      const response = await axios.post(
        "https://thunderlean-backend.onrender.com/api/ai/get-tip",
        {
          prompt: userInput,
        }
      );
      setGeneratedTip(response.data.tip);
    } catch (error) {
      setGeneratedTip(
        "Sorry, I couldn't fetch a tip right now. Please try again."
      );
      console.error("Error fetching tip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickGoalClick = (goal) => {
    setUserInput(goal);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      <Sidebar
        activePage="get-tip"
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <header className="bg-purple-200 text-pink-800 py-4 px-6 rounded-lg mb-8 text-center relative">
          {/* Hamburger icon for mobile */}
          
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
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGetTip();
                }
              }}
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
              <div className="text-gray-700 leading-relaxed">
                <ReactMarkdown>{generatedTip}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GetTip;
