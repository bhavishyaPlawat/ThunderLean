import React, { forwardRef } from "react";

const CTASection = forwardRef(({ visible }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-gradient-to-r from-purple-200 to-blue-200 py-16 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-800 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl font-bold text-black mb-6 animate-bounce-subtle">
          Ready to Transform Your Fitness Journey?
        </h2>
        <p className="text-xl text-black/90 mb-8">
          Join thousands of users who have already discovered the power of AI-driven fitness tracking
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-2xl animate-pulse-subtle">
            <span className="group-hover:animate-bounce inline-block">🚀</span> Start Now
          </button>
          <button className="group border-2 border-white px-8 py-4 rounded-full font-bold text-lg bg-white text-purple-600 transform hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-2xl">
            <span className="group-hover:animate-bounce inline-block">📞</span> Contact Us
          </button>
        </div>
      </div>
    </div>
  );
});

export default CTASection;
