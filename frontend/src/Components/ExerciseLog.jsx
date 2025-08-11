import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import GetTip from "./GetTip";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import BottomNav from './BottomNav';

const WorkoutCard = ({ title, imageUrl }) => (
  <button className="text-center group">
    <div className="relative bg-[#1E1E1E] rounded-xl mb-2 flex items-center justify-center h-28 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 filter saturate-75 brightness-90"
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl ring-1 ring-black/30 pointer-events-none" />
    </div>
    <p className="font-semibold text-gray-300 group-hover:text-white transition-colors text-sm">
      {title}
    </p>
  </button>
);

const ExerciseLog = () => {
  const location = useLocation();
  const activePage = location.pathname.split("/")[1] || "exercise-log";
  const [isTipOpen, setIsTipOpen] = useState(false);

  const workouts = [
    {
      title: "Running",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1670002396637-09ad86899d0a?w=900&auto=format&fit=crop&q=60",
    },
    {
      title: "Cycling",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1713184149461-69b0abeb3daa?w=900&auto=format&fit=crop&q=60",
    },
    {
      title: "Swimming",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?w=900&auto=format&fit=crop&q=60",
    },
    {
      title: "Yoga",
      imageUrl:
        "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&auto=format&fit=crop&q=60",
    },
    {
      title: "Weightlifting",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661827655293-9a4abebefeb9?w=900&auto=format&fit=crop&q=60",
    },
    {
      title: "Hiking",
      imageUrl:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <>
      <div className="flex h-screen bg-[#121212] overflow-hidden">
        <Sidebar activePage={activePage} />

        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Today's Activity</h1>
            </header>

            {/* Calories Burned Section with External Icon */}
            <section className="bg-[#1E1E1E] rounded-xl p-6 mb-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1912/1912723.png"
                  alt="Calories Burned"
                  className="w-12 h-12 object-contain"
                />

                <div>
                  <p className="text-sm text-gray-400 mb-1">Calories Burned</p>
                  <p className="text-5xl font-bold text-green-500">1,500</p>
                  <p className="text-gray-500">kcal</p>
                </div>
              </div>
              <div className=" w-76 flex items-center justify-center">
                
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Start a Workout</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.title}
                    title={workout.title}
                    imageUrl={workout.imageUrl}
                  />
                ))}
              </div>
              <div className="text-center">
                <button className="bg-green-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors">
                  Log Past Exercise
                </button>
              </div>
            </section>
          </div>
          <button
            onClick={() => setIsTipOpen(true)}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-40"
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

export default ExerciseLog;
