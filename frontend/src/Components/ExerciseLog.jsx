import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import GetTip from './GetTip';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

// Reusable component for the "Start a Workout" cards
const WorkoutCard = ({ title, imageUrl }) => (
  <button className="text-center group">
    <div className="bg-[#1E1E1E] rounded-xl p-4 mb-2 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={title} className="w-20 h-20 object-contain mx-auto" />
    </div>
    <p className="font-semibold text-gray-300 group-hover:text-white transition-colors">{title}</p>
  </button>
);

const ExerciseLog = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'exercise-log';
  const [isTipOpen, setIsTipOpen] = useState(false);

  const workouts = [
    { title: 'Running', imageUrl: 'https://i.imgur.com/gAm7y4c.png' },
    { title: 'Cycling', imageUrl: 'https://i.imgur.com/L12wV3t.png' },
    { title: 'Swimming', imageUrl: 'https://i.imgur.com/u59sU8G.png' },
    { title: 'Yoga', imageUrl: 'https://i.imgur.com/L4Zf1gB.png' },
    { title: 'Weightlifting', imageUrl: 'https://i.imgur.com/qgW6n3U.png' },
    { title: 'Hiking', imageUrl: 'https://i.imgur.com/n6m1t0J.png' },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-[#121212]">
        <Sidebar activePage={activePage} />

        <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Today's Activity</h1>
            </header>

            {/* Calories Burned Card */}
            <section className="bg-[#1E1E1E] rounded-xl p-6 mb-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Calories Burned</p>
                <p className="text-5xl font-bold text-green-500">1,500</p>
                <p className="text-gray-500">kcal</p>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <img src="https://i.imgur.com/gAm7y4c.png" alt="Person running" className="w-24 h-24 object-contain" />
              </div>
            </section>

            {/* Start a Workout Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Start a Workout</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.title} title={workout.title} imageUrl={workout.imageUrl} />
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
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-40"
          >
            <IoChatbubbleEllipsesOutline className="h-6 w-6" />
          </button>
        </main>
      </div>

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
