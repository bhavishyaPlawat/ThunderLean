import React from "react";

const StorySection = ({ storyRef, visibleSections, activeSection, setActiveSection }) => {
    const isVisible = visibleSections.story;
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
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full animate-width-expand"></div>
      </div>

      {/* Tabs */}
      <div
        className={`flex flex-wrap justify-center mb-8 transition-all duration-800 delay-400 ${
          visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {["mission", "vision", "values"].map((section, index) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`mx-2 mb-4 px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 ${
              activeSection === section
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105 animate-pulse-subtle"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            } ${visibleSections.story ? `opacity-100 translate-y-0` : "opacity-0 translate-y-4"}`}
            style={{
              animationDelay: `${index * 100 + 600}ms`,
              transitionDelay: `${index * 100 + 600}ms`,
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-800 hover:shadow-2xl border border-purple-100 hover:scale-105 delay-800 ${
          visibleSections.story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {activeSection === "mission" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-spin-slow hover:animate-bounce">
              <img src="/assets/mission.png" alt="mission" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              To democratize fitness and nutrition by making advanced AI technology accessible to
              everyone. We believe that everyone deserves personalized, intelligent guidance on their
              health journey, regardless of their technical expertise or fitness background.
              ThunderLean transforms complex nutritional data into simple, actionable insights that
              empower users to make informed decisions about their health and wellness.
            </p>
          </div>
        )}

        {activeSection === "vision" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-spin-slow hover:animate-bounce">
              <img src="/assets/vision.png" alt="vision" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              To become the world's most trusted AI-powered health companion, creating a future where
              personalized nutrition and fitness guidance is as easy as taking a photo of your meal.
              We envision a world where technology seamlessly integrates with daily life to promote
              healthier habits, prevent chronic diseases, and enhance the quality of life for millions
              of people worldwide.
            </p>
          </div>
        )}

        {activeSection === "values" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 animate-spin-slow hover:animate-bounce">
              <img src="/assets/values.png" alt="values" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <img src="/assets/mission.png" alt="accuracy" />,
                  title: "Accuracy",
                  desc: "We prioritize precision in every calorie count and nutritional analysis.",
                },
                {
                  icon: <img src="/assets/Accessibility.png" alt="accessibility" />,
                  title: "Accessibility",
                  desc: "Making advanced AI technology simple and accessible for everyone.",
                },
                {
                  icon: <img src="/assets/privacy.png" alt="privacy" />,
                  title: "Privacy",
                  desc: "Your health data is sacred, and we protect it with the highest standards.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4 hover:animate-spin">
                    {value.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorySection;
