import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaCamera, FaPaperclip, FaBars } from "react-icons/fa"; // Import FaBars
import { IoMdAdd } from "react-icons/io";

const AiTrack = () => {
  const [goal, setGoal] = useState("loose");
  const [looseGoal, setLooseGoal] = useState("1kg");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const mealItems = [
    { name: "Breakfast", calories: "370Kcal" },
    { name: "Lunch", calories: "370Kcal" },
    { name: "Snacks", calories: "370Kcal" },
    { name: "Dinner", calories: "370Kcal" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar
        activePage="ai-track"
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Header with Menu Button */}
        <header className="flex items-center justify-between md:justify-center bg-pink-200 text-gray-700 py-4 px-6 rounded-lg mb-8 text-center relative">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute left-4 text-gray-600"
          >
            <FaBars size={24} />
          </button>
          <h2 className="text-lg font-bold tracking-widest uppercase">
            AI Track
          </h2>
        </header>

        {/* ... (The rest of your AiTrack component code remains the same) ... */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto">
          {/* Goal Setter */}
          <div className="flex justify-between items-center mb-8 flex-wrap">
            <h3 className="text-xl font-bold text-gray-800 hidden sm:block">
              Set Goal
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1 bg-purple-200 p-1 rounded-full">
                <button
                  onClick={() => setGoal("loose")}
                  className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm font-semibold transition ${
                    goal === "loose"
                      ? "bg-white text-purple-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  ✓ Loose
                </button>
                <button
                  onClick={() => setGoal("gain")}
                  className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm font-semibold transition ${
                    goal === "gain"
                      ? "bg-white text-purple-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  Gain
                </button>
              </div>
              {/* Conditional Dropdown */}
              {goal === "loose" && (
                <div className="relative">
                  <select
                    value={looseGoal}
                    onChange={(e) => setLooseGoal(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow"
                  >
                    <option value="1kg">1kg / month</option>
                    <option value="2kg">2kg / month</option>
                    <option value="3kg">3kg / month</option>
                    <option value="4kg">4kg / month</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side: Meal Items */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                Smarter Calorie TRACKING Starts Here
              </h2>
              <div className="space-y-4">
                {mealItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white/50 p-3 sm:p-4 rounded-lg shadow"
                  >
                    <span className="font-semibold text-gray-700">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <FaPaperclip className="text-gray-600 cursor-pointer hover:text-purple-600" />
                      <FaCamera className="text-gray-600 cursor-pointer hover:text-purple-600" />
                      <span className="font-bold text-gray-800">
                        {item.calories}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <IoMdAdd size={24} />
                  <span>ADD MORE</span>
                </button>
              </div>
            </div>

            {/* Right Side: Quote */}
            <div className="w-full lg:w-1/3 flex justify-center mt-8 lg:mt-0">
              <div className="bg-pink-100 p-6 rounded-2xl shadow-md text-center max-w-xs">
                <h4 className="font-bold text-lg text-pink-800 mb-2">Quote</h4>
                <p className="text-gray-600 italic">
                  "Your body can stand almost anything. It's your mind you have
                  to convince."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiTrack;
