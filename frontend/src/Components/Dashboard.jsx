import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Adjust path as needed
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// --- MOCK DATA ---
const dailyNutritionData = {
  '2025-08-05': { protein: 70, carbohydrate: 150, fat: 50, totalCalories: 250 },
  '2025-08-16': { protein: 90, carbohydrate: 180, fat: 60, totalCalories: 280 },
  '2025-08-17': { protein: 85, carbohydrate: 200, fat: 55, totalCalories: 300 },
  '2025-08-24': { protein: 100, carbohydrate: 220, fat: 70, totalCalories: 320 },
};

// --- Calendar Component ---
const Calendar = ({ setSelectedDate }) => {
  const [date, setDate] = useState(new Date(2025, 7, 17));
  const [activeDay, setActiveDay] = useState(17);

  const monthNames = [..."January February March April May June July August September October November December".split(" ")];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const changeMonth = (offset) => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setActiveDay(null);
  };

  const handleDayClick = (day) => {
    setActiveDay(day);
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    const dateString = newDate.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-purple-200">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h3 className="font-bold">{monthNames[date.getMonth()]} {date.getFullYear()}</h3>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm text-gray-500">
        {daysOfWeek.map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, d) => (
          <button
            key={d + 1}
            onClick={() => handleDayClick(d + 1)}
            className={`w-8 h-8 rounded-full ${activeDay === d + 1 ? 'bg-[#8C4DCF] text-white' : 'hover:bg-purple-100'}`}
          >
            {d + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Nutrition Chart ---
const NutritionChart = ({ data }) => {
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat', 'Calories'],
    datasets: [{
      label: 'in grams',
      data: [data.protein, data.carbohydrate, data.fat, data.totalCalories],
      backgroundColor: ['rgb(140, 77, 207)', 'rgb(197, 166, 243)'],

      borderWidth: 1,
    }],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 350 } },
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
};

// --- Goal Chart ---
const GoalChart = () => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [2, 8],
      backgroundColor: ['rgb(140, 77, 207)', 'rgb(197, 166, 243)'],
      borderColor: ['#fff'],
      borderWidth: 4,
      circumference: 270,
      rotation: 225,
    }],
  };
  const options = {
    cutout: '80%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };
  return (
    <div className="relative w-48 h-48">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <span className="font-bold text-xl text-gray-700">Lose</span>
        <span className="font-bold text-2xl text-gray-800">10Kg</span>
        <span className="text-gray-500 text-sm">more</span>
      </div>
    </div>
  );
};

// --- Main Dashboard ---
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-17');
  const [chartData, setChartData] = useState({ protein: 0, carbohydrate: 0, fat: 0, totalCalories: 0 });

  useEffect(() => {
    setChartData(dailyNutritionData[selectedDate] || { protein: 0, carbohydrate: 0, fat: 0, totalCalories: 0 });
  }, [selectedDate]);

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-purple-200 text-pink-800 font-bold py-3 px-6 rounded-lg mb-8 text-center">
          DASHBOARD
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <Calendar setSelectedDate={setSelectedDate} />
            <div className="bg-white p-6 rounded-lg shadow-md space-y-3 text-center border border-purple-200">
              <p className="text-gray-600">Streak: <span className="font-bold text-orange-500">🔥 10 Days</span></p>
              <p className="text-gray-600">Goal: <span className="font-bold text-gray-800">Lose 12kg</span></p>
              <p className="text-gray-600">Completed: <span className="font-bold text-green-500">Lost 2kg</span></p>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <NutritionChart data={chartData} />
            <div className="flex justify-center items-center space-x-8">
              <GoalChart />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
