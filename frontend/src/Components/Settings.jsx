import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import {
  IoPersonCircleOutline,
  IoRibbonOutline,
  IoPhonePortraitOutline,
  IoLogOutOutline,
  IoChevronForward
} from 'react-icons/io5';

const AchievementBadge = ({ imageUrl, alt }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-700">
    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ManageListItem = ({ icon, title, description }) => (
  <button className="w-full flex items-center space-x-4 p-4 text-left hover:bg-gray-800 rounded-lg transition-colors">
    <div className="p-2 bg-gray-700 rounded-lg">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="font-bold text-white">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <IoChevronForward className="text-gray-500 h-5 w-5" />
  </button>
);


const Settings = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'settings';

  const userData = {
    name: 'Sophia Carter',
    level: 3,
    joined: 2021,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
  };

  const achievements = [
    { id: 1, alt: '10k Steps Badge', imageUrl: 'https://i.imgur.com/L12wV3t.png' },
    { id: 2, alt: 'Marathon Finisher Badge', imageUrl: 'https://i.imgur.com/gAm7y4c.png' },
    { id: 3, alt: 'Healthy Eater Badge', imageUrl: 'https://i.imgur.com/u59sU8G.png' },
    { id: 4, alt: 'Consistent Logger Badge', imageUrl: 'https://i.imgur.com/qgW6n3U.png' },
  ];

  return (
    <>
    <div className="flex h-screen bg-[#121212] overflow-hidden">
      <Sidebar activePage={activePage} />

      <main className="flex-grow p-6 md:p-8 bg-[#121212] text-white font-sans overflow-y-auto pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto">

          <section className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 rounded-full mb-4 ring-4 ring-green-600 p-1">
              <img src={userData.avatarUrl} alt={userData.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400">Level {userData.level} &bull; Joined {userData.joined}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            <div className="bg-[#1E1E1E] p-5 rounded-xl flex justify-center space-x-4">
              {achievements.map(badge => (
                <AchievementBadge key={badge.id} imageUrl={badge.imageUrl} alt={badge.alt} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Manage</h2>
            <div className="bg-[#1E1E1E] p-2 rounded-xl space-y-1">
              <ManageListItem
                icon={<IoPersonCircleOutline className="text-green-400 h-6 w-6" />}
                title="Profile"
                description="View and edit your profile details"
              />
              <ManageListItem
                icon={<IoRibbonOutline className="text-green-400 h-6 w-6" />}
                title="Goals"
                description="Set and track your fitness goals"
              />
              <ManageListItem
                icon={<IoPhonePortraitOutline className="text-green-400 h-6 w-6" />}
                title="Devices"
                description="Connect and manage your devices"
              />
            </div>
          </section>

          <section className="text-center">
            <button className="flex items-center justify-center w-full max-w-xs mx-auto space-x-2 bg-gray-800 text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
              <IoLogOutOutline size={22} />
              <span>Log Out</span>
            </button>
          </section>

        </div>
      </main>
    </div>
    <BottomNav />
    </>
    
  );
};

export default Settings;
