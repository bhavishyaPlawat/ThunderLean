import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="relative w-full bg-custom-gradient rounded-b-[4rem] sm:rounded-b-[6rem] lg:rounded-b-[8rem] overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center text-center md:text-left pb-56 md:pb-0">
        {/* Text Content */}
        <div className="w-full lg:ml-[8%] md:w-1/2">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#1A1A1A]">
            Track Your <br /> Calories <br /> Smartly
          </h1>
          <p className="font-body text-gray-600 text-2xl sm:text-2xl lg:text-2xl font-medium mt-4">
            AI-powered insights for <br /> your fitness journey
          </p>
        </div>

        <div className="w-full md:w-1/2"></div>
      </div>

      {/* Image Container */}
      <div className="absolute bottom-0 right-0 left-0 md:left-auto md:w-1/2 flex justify-center items-end pointer-events-none">
        <img
          src="/assets/92b1abfd1bf20f53a8f801764609dfb4aa64d3a2.png"
          alt="Woman checking fitness tracker"
          className="h-auto w-full max-w-[250px] sm:max-w-[320px] md:max-w-sm lg:max-w-md pointer-events-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Hero;
