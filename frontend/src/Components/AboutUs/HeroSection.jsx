import React from "react";
import { ArrowDown } from "lucide-react";
import Navbar from "../Navbar"; 

const HeroSection = ({ heroRef, isVisible, scrollToSection, storyRef }) => {
  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-purple-200 via-purple-200 to-blue-300"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/15 rounded-full animate-bounce animation-delay-1000"></div>
      <div className="absolute top-32 right-1/4 w-8 h-8 bg-white/10 rounded-full animate-ping"></div>
      <div className="absolute top-60 left-1/3 w-6 h-6 bg-white/20 rounded-full animate-bounce animation-delay-500"></div>
      <div className="absolute bottom-40 right-1/3 w-10 h-10 bg-white/15 rounded-full animate-pulse animation-delay-700"></div>

      {/* Hero Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up animation-delay-300">
          <span className="text-4xl animate-bounce">⚡</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-gradient bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-300% animate-gradient-x">
            Thunder
            <span className="text-yellow-300 animate-pulse">Lean</span>
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up animation-delay-500">
          About Us
        </h2>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-700">
          Revolutionizing fitness through the power of Artificial Intelligence
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 text-white border border-white/30 cursor-pointer hover:bg-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            🚀 AI-Powered • Smart • Intuitive
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown
            className="text-white/70 w-8 h-8 cursor-pointer hover:text-white transition-colors duration-300"
            onClick={() => scrollToSection(storyRef)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
