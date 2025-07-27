import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import PageFooter from "./PageFooter";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative ">
      <div
        className="bg-custom-gradient rounded-b-[13.88vw] pt-[2vh] px-[6vw] relative"
        style={{ width: "1440px", height: "501px" }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* HERO SECTION */}
        <Hero />

        {/* BUTTON (Better Positioned) */}
        <div className="absolute top-[50vh] left-[25vw] transform -translate-x-1/2 bottom-[-2rem]">
          <Link
            to="/dashboard"
            className="w-[17.08vw] h-[5.97vh] bg-[#8C4DCF] text-white text-[1.3vw] font-semibold rounded-[1.39vw] flex items-center justify-center shadow-lg hover:bg-[#7a39c1] transition duration-300"
          >
            Start Now
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <Features />

      {/* Footer */}
      <PageFooter />
    </div>
  );
};

export default Home;
