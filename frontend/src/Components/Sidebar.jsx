import React, { useState } from 'react';

// --- ICON COMPONENTS ---
const LogoIcon = ({ className }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <span className="font-bold text-xl">THUNDERLEAN</span>
  </div>
);

const DashboardIconSidebar = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-pink-400' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const TDEECalculatorIconSidebar = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-pink-400' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-4 5a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1H10a1 1 0 01-1-1v-6zM3 10h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const AITrackIconSidebar = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-pink-400' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0h-4v-1h4m0 11v1m-4-1v-1m8 0v-1m-4 1v-1m0 0v-1m0 0h.01M12 18.01V18m0 .01H12m4.01-4.01h.01M7.99 13.99h.01m0 0h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

const TipIconSidebar = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-pink-400' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ activePage, onNavigate }) => {
  const navItems = [
    { slug: 'dashboard', icon: DashboardIconSidebar, label: 'Dashboard' },
    { slug: 'tdee-calculator', icon: TDEECalculatorIconSidebar, label: 'TDEE Calculator' },
    { slug: 'ai-track', icon: AITrackIconSidebar, label: 'AI Track' },
    { slug: 'get-tip', icon: TipIconSidebar, label: 'Get free Tip' },
  ];

  return (
    <aside className="bg-gradient-to-b from-gray-900 to-blue-900 text-white w-64 h-screen p-6 flex-shrink-0 flex flex-col">
      <LogoIcon className="text-white mb-12" />
      <nav className="space-y-4">
        {navItems.map(item => {
          const isActive = item.slug === activePage;
          return (
            <a
              key={item.slug}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.slug);
              }}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive ? 'bg-pink-500/20 border border-pink-400 text-white' : 'hover:bg-white/10'}`}
            >
              <item.icon active={isActive} />
              <span className="font-semibold">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;