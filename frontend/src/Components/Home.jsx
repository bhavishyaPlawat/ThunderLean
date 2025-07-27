import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import PageFooter from "./PageFooter";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <div
        className="bg-custom-gradient rounded-b-[13.88vw] pt-[2vh] px-[6vw] relative"
        style={{ width: "100vw", height: "65vh" }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <Hero />
      </div>

      {/* START BUTTON (Centered between Hero & Features) */}
      <div className="flex justify-center my-[6vh] absolute top-[45vh] left-[16vw]">
        <Link
          to="/dashboard"
          className="w-[17vw] h-[6vh] bg-[#8C4DCF] text-white text-[1.3vw] font-semibold rounded-[1.5vw] flex items-center justify-center shadow-lg hover:bg-[#7a39c1] transition duration-300"
        >
          Start Now
        </Link>
      </div>

      {/* FEATURES */}
      <Features />

      {/* FOOTER */}
      <PageFooter />
    </div>
  );
};

export default Home;
