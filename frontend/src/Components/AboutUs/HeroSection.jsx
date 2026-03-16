import React from "react";
import { ArrowDown } from "lucide-react";
import Navbar from "../Navbar"; 

import {
  AiFillThunderbolt,
} from "react-icons/ai";
const HeroSection = ({ heroRef, isVisible, scrollToSection, storyRef }) => {
  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br bg-custom-gradient"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <Navbar />

      {/* Hero Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up animation-delay-300">
          <AiFillThunderbolt className="h-12 w-12 text-[#8C4DCF] animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold text-black ">
            Thunder
            <span className="text-black animate-pulse">Lean</span>
          </h1>
        </div>


        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 animate-fade-in-up animation-delay-500">
          About Us
        </h2>

        <p className="text-xl md:text-2xl text-black/90 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-700">
          Revolutionizing fitness through the power of Artificial Intelligence
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 text-black border border-black/30 cursor-pointer hover:bg-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            🚀 AI-Powered • Smart • Intuitive
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown
            className="text-black/70 w-8 h-8 cursor-pointer hover:text-black transition-colors duration-300"
            onClick={() => scrollToSection(storyRef)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
