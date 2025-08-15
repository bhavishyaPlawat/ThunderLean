import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import BottomNav from "./BottomNav";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  IoChatbubbleEllipsesOutline,
  IoTrendingUpOutline,
  IoFlameOutline,
  IoFitnessOutline,
} from "react-icons/io5";
import { FaTrophy, FaShoePrints, FaPencilAlt } from "react-icons/fa";
import GetTip from "./GetTip";
import { supabase } from "../supabaseClient"; // Import supabase

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({
  label,
  value,
  unit,
  valueColor = "text-white",
  icon,
  gradient = "from-blue-500/20 to-purple-500/20",
}) => (
  <div
    className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">{icon}</div>
      <div className="text-right">
        <p className="text-sm text-gray-300 font-medium">{label}</p>
      </div>
    </div>
    <div className="flex items-baseline space-x-2">
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
      <span className="text-lg text-gray-400 font-medium">{unit}</span>
    </div>
  </div>
);

const AchievementCard = ({ icon, text }) => (
  <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/30 p-5 rounded-2xl flex items-center space-x-4 hover:from-gray-700/80 hover:to-gray-600/80 transition-all duration-300 shadow-lg">
    <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-gray-600/30">
      {icon}
    </div>
    <p className="font-semibold text-white text-sm">{text}</p>
  </div>
);

const MacroProgressBar = ({ name, current, goal, color, bgColor }) => (
  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm font-semibold text-gray-200">{name}</p>
      <p className="text-sm font-bold text-white">
        {current}g / {goal}g
      </p>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
      <div
        className={`${color} h-3 rounded-full transition-all duration-500 ease-out shadow-lg`}
        style={{ width: `${Math.min((current / goal) * 100, 100)}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-2">
      <span className="text-xs text-gray-400">0g</span>
      <span className="text-xs text-gray-400">{goal}g</span>
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
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
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
          color: "rgba(255, 255, 255, 0.08)",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl h-72 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-bold text-lg text-white">
            Weekly Exercise Summary
          </p>
          <p className="text-sm text-gray-400">Track your workout progress</p>
        </div>
        <div className="p-2 bg-green-500/20 rounded-lg">
          <IoFitnessOutline className="h-5 w-5 text-green-400" />
        </div>
      </div>
      <div className="h-48">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[1] || "dashboard";
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [foodLogs, setFoodLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("today");
  const [dashboardStats, setDashboardStats] = useState({
    caloriesIn: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    const fetchFoodLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("food_logs")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching food logs:", error);
        } else {
          setFoodLogs(data);
        }
      }
    };

    fetchFoodLogs();

    const subscription = supabase
      .channel("food_logs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_logs" },
        (payload) => {
          fetchFoodLogs();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const calculateStats = () => {
      const today = new Date().toISOString().slice(0, 10);
      let filteredLogs = [];

      if (activeTab === "today") {
        filteredLogs = foodLogs.filter(
          (log) => log.created_at.slice(0, 10) === today
        );
      } else if (activeTab === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().slice(0, 10);

        filteredLogs = foodLogs.filter(
          (log) => log.created_at.slice(0, 10) >= weekAgoStr
        );
      }

      const stats = filteredLogs.reduce(
        (acc, log) => {
          acc.caloriesIn += log.calories || 0;
          acc.protein += log.protein_grams || 0;
          acc.carbs += log.carbs_grams || 0;
          acc.fat += log.fat_grams || 0;
          return acc;
        },
        { caloriesIn: 0, protein: 0, carbs: 0, fat: 0 }
      );
      setDashboardStats(stats);
    };

    calculateStats();
  }, [foodLogs, activeTab]);

  const netCalories =
    activeTab === "today"
      ? dashboardStats.caloriesIn - 2300
      : dashboardStats.caloriesIn - 16100;
  const caloriesOut = activeTab === "today" ? 2300 : 16100;

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-[#0F0F0F] via-[#121212] to-[#1A1A1A] font-sans overflow-hidden">
        <Sidebar activePage={activePage} />
        <main className="flex-1 p-6 text-white overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-gray-400 mt-1">
                    {activeTab === "today"
                      ? "Today's Overview"
                      : "This Week's Overview"}
                  </p>
                </div>
                <div className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
                  <button
                    onClick={() => setActiveTab("today")}
                    className={`text-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "today"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setActiveTab("week")}
                    className={`text-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "week"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    This Week
                  </button>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    label="Calories In"
                    value={dashboardStats.caloriesIn}
                    unit="kcal"
                    icon={
                      <IoFlameOutline className="h-5 w-5 text-orange-400" />
                    }
                    gradient="from-orange-500/20 to-red-500/20"
                  />
                  <StatCard
                    label="Calories Out"
                    value={caloriesOut.toLocaleString()}
                    unit="kcal"
                    icon={
                      <IoTrendingUpOutline className="h-5 w-5 text-blue-400" />
                    }
                    gradient="from-blue-500/20 to-cyan-500/20"
                  />
                  <StatCard
                    label="Net Calories"
                    value={netCalories}
                    unit="kcal"
                    valueColor={
                      netCalories >= 0 ? "text-green-400" : "text-red-400"
                    }
                    icon={
                      <IoTrendingUpOutline className="h-5 w-5 text-green-400" />
                    }
                    gradient="from-green-500/20 to-emerald-500/20"
                  />
                </div>

                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Macronutrient Breakdown
                      </h2>
                      <p className="text-gray-400 mt-1">
                        Track your daily nutrition goals
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MacroProgressBar
                      name="Protein"
                      current={Math.round(dashboardStats.protein)}
                      goal={200}
                      color="bg-gradient-to-r from-blue-400 to-blue-600"
                      bgColor="bg-blue-900/30"
                    />
                    <MacroProgressBar
                      name="Carbs"
                      current={Math.round(dashboardStats.carbs)}
                      goal={300}
                      color="bg-gradient-to-r from-green-400 to-green-600"
                      bgColor="bg-green-900/30"
                    />
                    <MacroProgressBar
                      name="Fat"
                      current={Math.round(dashboardStats.fat)}
                      goal={100}
                      color="bg-gradient-to-r from-yellow-400 to-orange-500"
                      bgColor="bg-yellow-900/30"
                    />
                  </div>
                </div>

                <ExerciseChart />
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-lg">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Recent Achievements
                  </h2>
                  <div className="space-y-4">
                    <AchievementCard
                      icon={<FaTrophy className="text-yellow-400 h-5 w-5" />}
                      text="First Week Completed"
                    />
                    <AchievementCard
                      icon={
                        <FaShoePrints className="text-blue-400 h-5 w-5 -rotate-90" />
                      }
                      text="10,000 Steps Reached"
                    />
                    <AchievementCard
                      icon={<FaPencilAlt className="text-green-400 h-5 w-5" />}
                      text="Consistent Logging"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsTipOpen(true)}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-40 border border-green-400/20"
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          </button>
        </main>
      </div>
      <BottomNav />
      <GetTip isOpen={isTipOpen} onClose={() => setIsTipOpen(false)} />

      {isTipOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsTipOpen(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
