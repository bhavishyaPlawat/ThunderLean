import React, { forwardRef } from "react";

const StatsSection = forwardRef(({ visible, counters, formatNumber }, ref) => {
  const stats = [
    { value: formatNumber(counters.users), label: "Active Users" },
    { value: formatNumber(counters.calories), label: "Calories Tracked" },
    { value: `${counters.accuracy}%`, label: "Accuracy Rate" },
    { value: `${counters.support}/7`, label: "AI Support" },
  ];

  return (
    <div ref={ref} className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-black group transition-all duration-800 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
              <div
                className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-500 group-hover:scale-110 ${
                  visible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default StatsSection;
