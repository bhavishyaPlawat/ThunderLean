import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  IoFastFoodOutline,
  IoBarbellOutline,
  IoChatbubbleEllipsesOutline,
  IoFlameOutline,
  IoTrendingUpOutline,
  IoImageOutline,
} from "react-icons/io5";

import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import GetTip from "./GetTip";
import { supabase } from "../supabaseClient"; // Make sure to import supabase

const ActivityItem = ({
  icon,
  title,
  description,
  calories,
  image_url,
  hasImage,
}) => (
  <div className="group bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm border border-gray-600/30 p-5 rounded-2xl hover:from-gray-700/70 hover:to-gray-600/70 transition-all duration-300 shadow-lg hover:shadow-xl">
    <div className="flex items-center space-x-4">
      {/* Image or Icon */}
      <div className="relative">
        {hasImage && image_url ? (
          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-600/50 shadow-lg">
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-gray-600/30 group-hover:from-green-500/30 group-hover:to-blue-500/30 transition-all duration-300">
            {hasImage ? (
              <IoImageOutline className="text-gray-400 h-6 w-6" />
            ) : (
              React.cloneElement(icon, { className: "text-green-400 h-6 w-6" })
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-lg leading-tight truncate group-hover:text-green-100 transition-colors duration-200">
              {title}
            </p>
            <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-200">
              {description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-200">
              {calories} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[1] || "home";
  const [isTipOpen, setIsTipOpen] = useState(false);

  // State for dynamic data
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(2000); // You can make this dynamic later

  // Fetch data on component mount and listen for real-time updates
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().slice(0, 10);
      const startTime = `${today}T00:00:00.000Z`;
      const endTime = `${today}T23:59:59.999Z`;

      // Fetch today's calories
      const { data: caloriesData, error: caloriesError } = await supabase
        .from("food_logs")
        .select("calories")
        .eq("user_id", user.id)
        .gte("created_at", startTime)
        .lte("created_at", endTime);

      if (caloriesError) {
        console.error("Error fetching calories:", caloriesError);
      } else {
        const totalCalories = caloriesData.reduce(
          (sum, log) => sum + (log.calories || 0),
          0
        );
        setCaloriesConsumed(totalCalories);
      }

      // Fetch recent activities (e.g., last 4 logs) with image_url
      const { data: activityData, error: activityError } = await supabase
        .from("food_logs")
        .select("id, food_name, calories, created_at, image_url")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);

      if (activityError) {
        console.error("Error fetching recent activities:", activityError);
      } else {
        setRecentActivities(activityData);
      }
    };

    fetchData();

    // Listen for any changes in the food_logs table and refetch data
    const subscription = supabase
      .channel("food_logs_home")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_logs" },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const caloriePercentage =
    dailyGoal > 0 ? Math.min((caloriesConsumed / dailyGoal) * 100, 100) : 0;

  return (
    <>
      <div className="flex h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1C1C1C] overflow-hidden">
        <Sidebar activePage={activePage} />

        <main className="flex-grow p-6 md:p-8 text-white font-sans overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10">
              <h1 className="text-4xl pt-2 font-bold bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-lg">
                Here's your nutrition summary for today
              </p>
            </header>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="group bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-sm border border-orange-500/20 p-8 rounded-3xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-orange-300 text-sm font-semibold uppercase tracking-wider mb-2">
                      Calories Consumed
                    </p>
                    <p className="text-4xl font-bold text-white mb-1">
                      {caloriesConsumed.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Daily nutrition intake
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                    <IoFlameOutline className="text-orange-400 h-8 w-8" />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-orange-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-orange-300 font-medium">
                      Active Tracking
                    </span>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm border border-blue-500/20 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">
                      Calories Burned
                    </p>
                    <p className="text-4xl font-bold text-white mb-1">500</p>
                    <p className="text-gray-400 text-sm">
                      Exercise & activities
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <IoBarbellOutline className="text-blue-400 h-8 w-8" />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-blue-300 font-medium">
                      Workout Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goal Card */}
            <div className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 backdrop-blur-sm border border-green-500/20 p-8 rounded-3xl mb-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold text-2xl text-white mb-2">
                    Daily Goal Progress
                  </h2>
                  <p className="text-gray-400">
                    Track your calorie intake target
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-400">
                    {caloriePercentage.toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-400">Complete</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <p className="text-green-300">Calorie Intake</p>
                  <p className="text-white">
                    {caloriesConsumed} / {dailyGoal} kcal
                  </p>
                </div>
                <div className="relative w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full h-4 overflow-hidden border border-gray-600/50">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${caloriePercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 kcal</span>
                  <span>{dailyGoal} kcal</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 backdrop-blur-sm border border-gray-600/30 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-bold text-2xl text-white mb-2">
                    Recent Activity
                  </h2>
                  <p className="text-gray-400">Your latest food entries</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                  <IoTrendingUpOutline className="h-5 w-5 text-green-400" />
                </div>
              </div>

              <div className="space-y-5">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      icon={<IoFastFoodOutline />}
                      title={activity.food_name}
                      description="Recent meal entry"
                      calories={activity.calories}
                      image_url={activity.image_url}
                      hasImage={!!activity.image_url}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="p-6 bg-gray-700/30 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <IoFastFoodOutline className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium mb-2">
                      No recent activity today
                    </p>
                    <p className="text-gray-600 text-sm">
                      Start logging your meals to see them here
                    </p>
                  </div>
                )}
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

export default Home;
