import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'home';

  return (
    <div className="flex h-screen bg-[#121212] overflow-hidden">
      <Sidebar activePage={activePage} />
      
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
