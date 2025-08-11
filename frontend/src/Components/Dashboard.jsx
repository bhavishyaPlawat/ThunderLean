import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// --- CORRECTED ICON IMPORTS ---
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaTrophy, FaShoePrints, FaPencilAlt } from "react-icons/fa";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Reusable Sub-components for the new design ---

const StatCard = ({ label, value, unit, valueColor = "text-white" }) => (
  <div className="bg-[#1E1E1E] p-5 rounded-xl">
    <p className="text-sm text-gray-400">{label}</p>
    <p className={`text-2xl font-bold ${valueColor}`}>
      {value}
      <span className="text-lg text-gray-400 ml-1">{unit}</span>
    </p>
  </div>
);

const AchievementCard = ({ icon, text }) => (
  <div className="bg-[#1E1E1E] p-4 rounded-xl flex items-center space-x-4">
    <div className="p-3 bg-gray-700 rounded-lg">{icon}</div>
    <p className="font-semibold text-white">{text}</p>
  </div>
);

const MacroProgressBar = ({ name, current, goal, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <p className="text-sm text-gray-300">{name}</p>
      <p className="text-sm text-gray-400">
        {current}g / {goal}g
      </p>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full`}
        style={{ width: `${(current / goal) * 100}%` }}
      ></div>
    </div>
  </div>
);

const ExerciseChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Minutes",
        data: [30, 45, 60, 25, 70, 55, 40],
        backgroundColor: "rgb(34, 197, 94, 0.5)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
  };

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl h-64">
      <p className="font-bold mb-4">Weekly Exercise Summary</p>
      <Bar options={options} data={data} />
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[1] || "dashboard";

  return (
    <div className="flex min-h-screen bg-[#121212] font-sans">
      <Sidebar activePage={activePage} />
      <main className="flex-1 p-6 text-white overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Today's Overview</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Calories In" value="2,100" unit="kcal" />
                <StatCard label="Calories Out" value="2,300" unit="kcal" />
                <StatCard
                  label="Net Calories"
                  value="-200"
                  unit="kcal"
                  valueColor="text-green-500"
                />
              </div>

              <div className="bg-[#1E1E1E] p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Macronutrient Breakdown</h2>
                <div className="space-y-4">
                  <MacroProgressBar
                    name="Protein"
                    current={120}
                    goal={200}
                    color="bg-blue-500"
                  />
                  <MacroProgressBar
                    name="Carbs"
                    current={240}
                    goal={300}
                    color="bg-green-500"
                  />
                  <MacroProgressBar
                    name="Fat"
                    current={40}
                    goal={100}
                    color="bg-yellow-500"
                  />
                </div>
              </div>

              <ExerciseChart />
            </div>

            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold">Achievements</h2>
              <div className="space-y-3">
                <AchievementCard
                  icon={<FaTrophy className="text-yellow-400 h-6 w-6" />}
                  text="First Week Completed"
                />
                <AchievementCard
                  icon={<FaShoePrints className="text-blue-400 h-6 w-6 -rotate-90" />}
                  text="10,000 Steps Reached"
                />
                <AchievementCard
                  icon={<FaPencilAlt className="text-green-400 h-6 w-6" />}
                  text="Consistent Logging"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
        <IoChatbubbleEllipsesOutline className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Dashboard;