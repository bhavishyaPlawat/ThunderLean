import React, { forwardRef } from "react";

const FeaturesSection = forwardRef(({ visible }, ref) => {
  const features = [
    {
      icon: <img src="/assets/ai_tracker.png" alt="ai_tracker" />,
      title: "AI-Powered Tracking",
      description:
        "Our Gemini-powered AI analyzes your meals with unprecedented accuracy, providing detailed nutritional breakdowns from simple descriptions or photos.",
    },
    {
      icon: <img src="/assets/Tdee_Calculator.png" alt="Tdee_Calculator" />,
      title: "Smart TDEE Calculator",
      description:
        "Get personalized calorie targets based on your unique metabolism, activity level, and fitness goals with our advanced calculation system.",
    },
    {
      icon: <img src="/assets/Detailed_Dashboard.png" alt="Detailed_Dashboard" />,
      title: "Interactive Dashboard",
      description:
        "Visualize your progress with beautiful charts and graphs, track your journey with our interactive calendar, and monitor achievements.",
    },
    {
      icon: <img src="/assets/Get_tips.png" alt="Get_tips" />,
      title: "Personalized Insights",
      description:
        "Receive customized recommendations and tips tailored to your specific fitness goals, whether it's weight loss, gain, or muscle building.",
    },
  ];

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-purple-50 via-blue-50 to-white py-16 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-800 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Makes Us Special
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-4 animate-width-expand"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technology meets intuitive design to create the ultimate
            fitness tracking experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-purple-100 hover:border-purple-200 group ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150 + 400}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:animate-bounce">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default FeaturesSection;
