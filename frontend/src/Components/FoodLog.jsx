import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  IoCloudUploadOutline,
  IoTextOutline,
  IoSunnyOutline,
  IoRestaurantOutline,
  IoMoonOutline,
  IoChevronForward,
  IoChatbubbleEllipsesOutline
} from 'react-icons/io5';

// You must import your Sidebar component here
import Sidebar from './Sidebar'; // Ensure this path is correct

// Reusable component for the top "AI Analysis" cards
const AiAnalysisCard = ({ title, description, buttonText, buttonIcon, imageUrl }) => (
  <div className="bg-[#1E1E1E] rounded-xl p-6 flex items-center justify-between space-x-4">
    <div className="flex-1">
      <p className="text-xs font-bold text-green-500 mb-1">AI POWERED</p>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <button className="flex items-center space-x-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
        {buttonIcon}
        <span>{buttonText}</span>
      </button>
    </div>
    <div className="flex-shrink-0 w-32 h-24">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-md" />
    </div>
  </div>
);

// Reusable component for the "Today's Meals" list items
const MealCard = ({ icon, mealType, calories }) => (
  <button className="w-full bg-[#1E1E1E] rounded-xl p-4 flex items-center space-x-4 text-left hover:bg-gray-800 transition-colors">
    <div className="p-3 bg-gray-700 rounded-lg">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="font-bold text-white">{mealType}</p>
      <p className="text-sm text-gray-400">{calories} calories</p>
    </div>
    <IoChevronForward className="text-gray-500 h-5 w-5" />
  </button>
);


const FoodLog = () => {
  // This logic is required to tell the sidebar which link is active
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'food-log';

  return (
    // This flex container places the sidebar and the main content side-by-side
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} />

      <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Food Log</h1>
            <button className="bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors">
              + Add Meal
            </button>
          </header>

          {/* AI Food Analysis Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">AI Food Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AiAnalysisCard
                title="Upload Image"
                description="Analyze your food by uploading an image."
                buttonText="Upload"
                buttonIcon={<IoCloudUploadOutline />}
                imageUrl="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <AiAnalysisCard
                title="Describe Food"
                description="Describe your meal to get nutritional info."
                buttonText="Describe"
                buttonIcon={<IoTextOutline />}
                imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
          </section>

          {/* Today's Meals Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Today's Meals</h2>
            <div className="space-y-3">
              <MealCard
                icon={<IoSunnyOutline className="text-yellow-400" />}
                mealType="Breakfast"
                calories="500"
              />
              <MealCard
                icon={<IoRestaurantOutline className="text-orange-400" />}
                mealType="Lunch"
                calories="700"
              />
              <MealCard
                icon={<IoMoonOutline className="text-blue-400" />}
                mealType="Dinner"
                calories="900"
              />
            </div>
          </section>

        </div>
        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
          <IoChatbubbleEllipsesOutline className="h-6 w-6" />
        </button>
      </main>
    </div>
  );
};

export default FoodLog;