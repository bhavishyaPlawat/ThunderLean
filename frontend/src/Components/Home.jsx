import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import PageFooter from "./PageFooter";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleStartNow=()=>{
    navigate('/dashboard');
  }
  return (
    <>
      <div
        className="bg-custom-gradient rounded-b-[13.88vw] pt-[2vh] px-[6vw] relative"
        style={{ width: "1440px", height: "501px" }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* HERO SECTION */}
        <Hero />
      </div>

      {/* BUTTON */}
      <div className="relative">
        <button onClick={handleStartNow} className="absolute left-[39.17vw] top-[8.25vh] w-[17.08vw] h-[5.97vh] bg-[#8C4DCF] text-white text-[1.3vw] font-semibold rounded-[1.39vw]">
          Start Now
        </button>
      </div>

      {/* FEATURES */}
      <Features />

      {/* Footer */}
      <PageFooter />
    </>
  );
};

export default Home;
