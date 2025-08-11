import React from 'react';
import { useLocation } from 'react-router-dom';
import { IoFastFoodOutline, IoBarbellOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

// You must import your Sidebar component here
import Sidebar from './Sidebar'; // Ensure this path is correct

// A helper component for each item in the "Recent Activity" list
const ActivityItem = ({ icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-green-500/20 p-3 rounded-full">
      {React.cloneElement(icon, { className: "text-green-400 h-5 w-5" })}
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-white">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

const Home = () => {
  // This logic must be repeated on every page that has a sidebar
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'home';

  return (
    // This flex container is required to place the sidebar and content together
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar activePage={activePage} />

      {/* Main container with the specified dark background */}
      <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
        <div className="max-w-5xl mx-auto">
          
          {/* Header: Dashboard Title and Timeframe Buttons */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Home</h1>
            <div className="flex space-x-2">
              <button className="text-sm px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1E1E1E] transition-colors">
                Today
              </button>
              <button className="text-sm px-4 py-2 rounded-lg bg-green-600 text-white font-semibold">
                This Week
              </button>
            </div>
          </header>

          {/* Top Cards: Calories Consumed & Burned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1E1E1E] p-6 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Calories Consumed</p>
                <p className="text-3xl font-bold">2,100</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <IoFastFoodOutline className="text-green-400 h-6 w-6" />
              </div>
            </div>
            <div className="bg-[#1E1E1E] p-6 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Calories Burned</p>
                <p className="text-3xl font-bold">500</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <IoBarbellOutline className="text-green-400 h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Daily Goal Card with Progress Bar */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl mb-6">
            <h2 className="font-bold mb-4 text-lg">Daily Goal</h2>
            <div className="flex justify-between items-center mb-1 text-sm">
              <p className="text-gray-300">Calorie Intake</p>
              <p className="text-gray-400">75%</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-right text-sm text-gray-400 mt-1">1500 / 2000 kcal</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl">
            <h2 className="font-bold mb-5 text-lg">Recent Activity</h2>
            <div className="space-y-5">
              <ActivityItem 
                icon={<IoFastFoodOutline />}
                title="Oatmeal with Berries"
                description="Breakfast - 350 kcal"
              />
              <ActivityItem 
                icon={<IoFastFoodOutline />}
                title="Chicken Salad"
                description="Lunch - 550 kcal"
              />
              <ActivityItem 
                icon={<IoBarbellOutline />}
                title="30 min Cardio"
                description="Workout - 250 kcal burned"
              />
              <ActivityItem 
                icon={<IoFastFoodOutline />}
                title="Salmon with Vegetables"
                description="Dinner - 600 kcal"
              />
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <button className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
        </button>
      </main>
    </div>
  );
};

export default Home;