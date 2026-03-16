import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const TdeeCalculator = () => {
  // State to manage form inputs and results
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("Choose");
  const [gender, setGender] = useState("male");
  const [weightMode, setWeightMode] = useState("loose");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle the API call when the "CALCULATE" button is clicked
  const handleCalculate = async () => {
    setError(""); // Clear previous errors
    // Basic validation to ensure all fields are filled
    if (!age || !height || !weight || activityLevel === "Choose") {
      setError("Please fill in all the details.");
      return;
    }

    setIsLoading(true);
    try {
      // API call to the backend endpoint
      const response = await axios.post(
        "https://thunderlean-backend.onrender.com/api/tdee/calculate",
        {
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          activityLevel,
          gender,
        }
      );
      // Set the TDEE results from the API response
      setResult(response.data);
    } catch (e) {
      // Handle any errors during the API call
      setError("Failed to fetch TDEE. Please check your inputs or the API.");
      setResult(null);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // This container is now correctly set up to handle a sticky sidebar
    <div className="flex flex-col md:flex-row md:items-start min-h-screen bg-gray-100 font-body">
      <Sidebar activePage="tdee-calculator" />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-200 text-pink-800 py-4 px-6 rounded-lg mb-8 text-center">
          <h2 className="text-lg font-bold tracking-widest uppercase">
            TDEE Calculator
          </h2>
        </header>

        {/* Calculator Section */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Input Form */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600">AGE</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Height
                </label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  />
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-gray-500">
                    cm
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Weight
                </label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  />
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-gray-500">
                    kg
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Workout
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="mt-1 w-full p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                >
                  <option value="Choose">Choose</option>
                  <option value="sedentary">
                    Sedentary (little or no exercise)
                  </option>
                  <option value="lightly_active">
                    Lightly active (light exercise/sports 1-3 days/week)
                  </option>
                  <option value="moderately_active">
                    Moderately active (moderate exercise/sports 3-5 days/week)
                  </option>
                  <option value="very_active">
                    Very active (hard exercise/sports 6-7 days a week)
                  </option>
                  <option value="super_active">
                    Super active (very hard exercise/physical job)
                  </option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGender("male")}
                  className={`w-full py-3 rounded-lg text-sm font-semibold transition ${
                    gender === "male"
                      ? "bg-purple-300 text-purple-800 ring-2 ring-purple-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  ✓ MALE
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`w-full py-3 rounded-lg text-sm font-semibold transition ${
                    gender === "female"
                      ? "bg-purple-300 text-purple-800 ring-2 ring-purple-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  FEMALE
                </button>
              </div>
            </div>

            {/* Result Section */}
            <div className="w-full lg:w-1/2 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/30 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                TDEE Result
              </h3>
              {error && (
                <p className="text-center text-red-500 mb-4">{error}</p>
              )}
              {isLoading ? (
                <p className="text-center text-gray-600">Calculating...</p>
              ) : result ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-600">Maintain weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {result.maintenanceCalories}{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Increase weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {result.weightGainCalories}{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lose weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {result.weightLossCalories}{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-600">Maintain weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      2405{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Increase weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      2800{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lose weight:</p>
                    <p className="text-2xl font-bold text-gray-900">
                      2000{" "}
                      <span className="text-base font-normal">kcal/day</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8">
            <button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "CALCULATING..." : "CALCULATE"}
            </button>
          </div>
        </div>

        {/* Weight Goal Section */}
        {result && (
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2 bg-purple-200 p-1 rounded-full">
                <button
                  onClick={() => setWeightMode("loose")}
                  className={`px-8 py-2 rounded-full text-sm font-semibold transition ${
                    weightMode === "loose"
                      ? "bg-white text-purple-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  ✓ LOSE
                </button>
                <button
                  onClick={() => setWeightMode("gain")}
                  className={`px-8 py-2 rounded-full text-sm font-semibold transition ${
                    weightMode === "gain"
                      ? "bg-white text-purple-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  GAIN
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-6 sm:p-8 rounded-3xl shadow-lg">
              {weightMode === "loose" ? (
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Lose 0.5 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories - 500}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Lose 1 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories - 1000}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Lose 2 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories - 2000}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Gain 0.5 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories + 500}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Gain 1 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories + 1000}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Gain 2 kg a week</p>
                    <p className="font-bold text-lg">
                      {result.maintenanceCalories + 2000}{" "}
                      <span className="text-sm font-normal">kcal/day</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TdeeCalculator;
