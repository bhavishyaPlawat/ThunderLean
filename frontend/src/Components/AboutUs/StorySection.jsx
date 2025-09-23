import React from "react";
import storyData from './data/storyData.json';

const StorySection = ({ storyRef, visibleSections, activeSection, setActiveSection }) => {
  const { sectionTitle, tabs } = storyData;
  const activeTabData = tabs.find(tab => tab.id === activeSection);

  return (
    <div
      ref={storyRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-1000 ${
        visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title */}
      <div
        className={`text-center mb-12 transition-all duration-800 delay-200 ${
          visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{sectionTitle}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full animate-width-expand"></div>
      </div>

      {/* Tabs */}
      <div
        className={`flex flex-wrap justify-center mb-8 transition-all duration-800 delay-400 ${
          visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`mx-2 mb-4 px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 ${
              activeSection === tab.id
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105 animate-pulse-subtle"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            } ${visibleSections.story ? `opacity-100 translate-y-0` : "opacity-0 translate-y-4"}`}
            style={{
              animationDelay: `${index * 100 + 600}ms`,
              transitionDelay: `${index * 100 + 600}ms`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-800 hover:shadow-2xl border border-purple-100 hover:scale-105 delay-800 ${
          visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {activeTabData && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-spin-slow hover:animate-bounce">
              <img src={activeTabData.icon} alt={activeTabData.id} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">{activeTabData.title}</h3>
            
            {/* Regular content for mission and vision */}
            {activeTabData.content && (
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {activeTabData.content}
              </p>
            )}
            
            {/* Special handling for values with grid */}
            {activeTabData.valuesList && (
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {activeTabData.valuesList.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 hover:animate-spin">
                      <img src={value.icon} alt={value.iconAlt} />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorySection;