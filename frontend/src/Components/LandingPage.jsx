import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import PageFooter from "./PageFooter";
import { Link } from "react-router-dom";

const Home = () => {
  return (

    <div className="font-body overflow-x-hidden bg-[#E3E7F0]">
      <Hero />

      {/* This section now controls the layout for the button and features below */}
      <section className="relative">
        {/* Button container with negative margin to pull it up */}
        <div className="flex justify-center -mt-7 sm:-mt-8 text-white">
          <Link
            to="/dashboard"
            className="relative z-10 w-48 h-12 sm:w-56 sm:h-14 bg-[#8C4DCF] text-white text-lg sm:text-xl font-semibold rounded-full flex items-center justify-center shadow-2xl hover:bg-[#7a39c1] transition-transform transform hover:scale-105 duration-300"
          >
            Start Now
          </Link>
        </div>


        {/* This wrapper adds the necessary space between the button and the features title */}
        <div className="pt-16 sm:pt-20">
          <Features />
        </div>
      </section>


      <PageFooter />
    </div>
  );
};

export default Home;
