import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { FaCamera, FaBars } from "react-icons/fa";
import axios from "axios";
import { supabase } from "../supabaseClient";

const AiTrack = () => {
  const [goal, setGoal] = useState("loose");
  const [looseGoal, setLooseGoal] = useState("1kg");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mealItems, setMealItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mealDescription, setMealDescription] = useState("");

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const analyzeMeal = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Invoke the Edge Function instead of using axios
      const { data, error } = await supabase.functions.invoke("analyze-meal", {
        body: formData,
      });

      if (error) throw error;

      const resultText = data.result;
      const parsedResult = JSON.parse(resultText);

      const newMeal = {
        name: parsedResult.name || "Analyzed Meal",
        calories: parsedResult.calories || "N/A",
        protein: parsedResult.protein || "N/A",
        carbs: parsedResult.carbs || "N/A",
        fat: parsedResult.fat || "N/A",
      };

      // Also, let's save this log to our new database!
      const { data: user_data } = await supabase.auth.getUser();
      if (user_data.user) {
        await supabase.from("food_logs").insert([
          {
            user_id: user_data.user.id,
            food_name: newMeal.name,
            calories: parseInt(newMeal.calories) || 0,
            protein: parseInt(newMeal.protein) || 0,
            carbs: parseInt(newMeal.carbs) || 0,
            fat: parseInt(newMeal.fat) || 0,
          },
        ]);
      }

      setMealItems((prevItems) => [...prevItems, newMeal]);
      setMealDescription("");
    } catch (err) {
      setError(err.message || "Failed to analyze meal. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("mealImage", file);
    if (mealDescription) {
      formData.append("meal", mealDescription);
    } else {
      formData.append("meal", file.name);
    }
    analyzeMeal(formData);
  };

  const handleTextSubmit = async () => {
    if (!mealDescription.trim()) {
      setError("Please enter a meal description.");
      return;
    }
    const formData = new FormData();
    formData.append("meal", mealDescription);
    analyzeMeal(formData);
  };

  return (
    <div className="flex flex-col md:flex-row  min-h-screen bg-gray-100 font-body">
      <Sidebar
        activePage="ai-track"
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 p-4 sm:p-10 lg:p-10 overflow-y-auto">
        <header className="flex items-center justify-center  md:justify-center bg-purple-200 text-pink-800 py-4 px-6 rounded-lg mb-8 text-center relative ">
          <h2 className="text-lg font-bold tracking-widest uppercase ">
            AI Track
          </h2>
        </header>

        <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-6 sm:p-9 rounded-3xl shadow-lg w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 flex-wrap">
            <h3 className="text-xl font-bold text-gray-800 hidden sm:block">
              Set Goal
            </h3>
            <div className="flex items-center space-x-2">
              {/* <div className="flex space-x-1 bg-purple-200 p-1 rounded-full">
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
              </div> */}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                Smarter Calorie TRACKING Starts Here
              </h2>

              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  placeholder="e.g., 2 chapatis with a bowl of dal"
                  className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={isLoading || !mealDescription.trim()}
                  className="px-3 py-3 bg-purple-600 text-white  font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:opacity-50 transition"
                >
                  Analyze
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {/* --- NEW TABULAR RESULTS DISPLAY --- */}
              <div className="space-y-4 mt-6">
                {mealItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/80 p-5 rounded-2xl shadow-md border border-purple-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 truncate text-center">
                      {item.name}
                    </h3>
                    <div className="space-y-3 px-2">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Protein</span>
                        <span className="font-bold text-gray-800">
                          {item.protein}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Carbs</span>
                        <span className="font-bold text-gray-800">
                          {item.carbs}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Fat</span>
                        <span className="font-bold text-gray-800">
                          {item.fat}
                        </span>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xs text-gray-500">
                        Total Calories
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-purple-700">
                          {item.calories}
                        </span>
                        <span className="text-2xl" role="img" aria-label="fire">
                          🔥
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-center items-center bg-white/50 p-4 rounded-lg shadow">
                    <p className="text-gray-600">Analyzing your meal...</p>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center items-center bg-red-100 p-4 rounded-lg shadow">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleIconClick}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaCamera />
                  <span>Analyze Meal from Image</span>
                </button>
              </div>
            </div>

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
