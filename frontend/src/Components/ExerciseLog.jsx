import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const WorkoutCard = ({ title, imageUrl }) => (
  <button className="text-center group">
    <div className="relative bg-[#1E1E1E] rounded-xl p-0 mb-2 flex items-center justify-center h-28 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 filter saturate-75 brightness-90"
      />
      {/* Dark overlay for consistent look */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {/* Soft inner border */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-black/30 pointer-events-none" />
    </div>
    <p className="font-semibold text-gray-300 group-hover:text-white transition-colors text-sm">{title}</p>
  </button>
);

const ExerciseLog = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'exercise-log';

  // Curated real-life, minimalist photos (Unsplash)
  const workouts = [
    { title: 'Running', imageUrl: 'https://plus.unsplash.com/premium_photo-1670002396637-09ad86899d0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D' },
    { title: 'Cycling', imageUrl: 'https://plus.unsplash.com/premium_photo-1713184149461-69b0abeb3daa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Swimming', imageUrl: 'https://plus.unsplash.com/premium_photo-1664475361436-e37f6f2ba407?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dpbW1pbmd8ZW58MHx8MHx8fDA%3D' },
    { title: 'Yoga', imageUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Weightlifting', imageUrl: 'https://plus.unsplash.com/premium_photo-1661827655293-9a4abebefeb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2VpZ2h0bGlmdGluZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { title: 'Hiking', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGlraW5nfGVufDB8fDB8fHww' },
  ];

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar activePage={activePage} />

      <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
        <div className="max-w-6xl mx-auto">

          <header className="mb-8">
            <h1 className="text-3xl font-bold">Today's Activity</h1>
          </header>

          {/* Calories Burned Card */}
          <section className="bg-[#1E1E1E] rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Calories Burned</p>
              <p className="text-5xl font-bold text-green-500">1,500</p>
              <p className="text-gray-500">kcal</p>
            </div>
            <div className="w-36 h-24 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-tr from-black/10 to-white/10">
              <img
                src="https://img.icons8.com/ios-filled/150/22c55e/fire-element.png"
                alt="Calories burned"
                className="w-20 h-20 object-contain"
              />
            </div>
          </section>

          {/* Start a Workout Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Start a Workout</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-8">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.title} title={workout.title} imageUrl={workout.imageUrl} />
              ))}
            </div>

            <div className="text-center">
              <button className="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
                Log Past Exercise
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ExerciseLog;