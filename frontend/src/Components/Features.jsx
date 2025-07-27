import React from "react";

const Features = () => {
  return (
    <div className="relative h-[60vh]">
      {/* Features Gradient Box */}
      <div className="absolute left-[4vw] top-[19vh] w-[91.25vw] h-[7.87vh] bg-custom-gradient rounded-[1.38vw] flex items-center justify-center">
        <h2 className="text-black text-[2vw] font-bold font-Gilroy">
          Features
        </h2>
      </div>

      {/* TDEE Calculator Box just below */}
      <div>
        <div className="absolute left-[4vw] top-[38vh] w-[50.25vw] bg-[#D9D9D9] rounded-[1.38vw] px-[3vw] py-[3vh] text-center">
          <h2 className="text-[2.2vw] font-bold text-black mb-[2vh] font-Gilroy">
            TDEE Calculator
          </h2>
          <div className="flex justify-center">
            <ul className="list-disc text-[1.2vw] text-[#1A1A1A] leading-[1.8vw] font-medium font-Poppins text-left pl-[1.5vw]">
              <li>Calculate your Total Daily Energy Expenditure</li>
              <li>Personalized calorie needs based on your input</li>
              <li>Simple, fast, and tailored to your fitness goals</li>
            </ul>
          </div>
        </div>
        <img
          src="src/assets/WhatsApp_Image_2025-07-27_at_14.37.47_210d55e7-removebg-preview.png"
          alt=""
          width={300}
          className="absolute left-[60vw] top-[30vh]"
        />
      </div>

      {/* AI Calorie Tracker Box */}
      <div>
        <div className="absolute left-[44vw] top-[70vh] w-[50.25vw] bg-[#D9D9D9] rounded-[1.38vw] px-[3vw] py-[3vh] text-center">
          <h2 className="text-[2.2vw] font-bold text-black mb-[2vh] font-Gilroy">
            AI Calorie Tracker
          </h2>
          <div className="flex justify-center">
            <ul className="list-disc text-[1.2vw] text-[#1A1A1A] leading-[1.8vw] font-medium font-Poppins text-left pl-[1.5vw]">
              <li>AI-powered meal tracking with photo recognition</li>
              <li>Log food effortlessly, no manual calculations</li>
              <li>Smart insights to keep your diet on track</li>
            </ul>
          </div>
        </div>
        <img
          src="src/assets/ai_tracker.png"
          alt=""
          width={300}
          className="absolute left-[15vw] top-[65vh]"
        />
      </div>

      {/* Detailed Dashboard */}
      <div>
        <div className="absolute left-[4vw] top-[105vh] w-[50.25vw] bg-[#D9D9D9] rounded-[1.38vw] px-[3vw] py-[3vh] text-center">
          <h2 className="text-[2.2vw] font-bold text-black mb-[2vh] font-Gilroy">
            Detailed Dashboard
          </h2>
          <div className="flex justify-center">
            <ul className="list-disc text-[1.2vw] text-[#1A1A1A] leading-[1.8vw] font-medium font-Poppins text-left pl-[1.5vw]">
              <li>Comprehensive view of your health progress</li>
              <li>Track calorie trends and fitness metrics</li>
              <li>Actionable insights to optimize your goals</li>
            </ul>
          </div>
        </div>
        <img
          src="src/assets/Detailed_Dashboard.png"
          alt=""
          width={300}
          className="absolute left-[60vw] top-[97vh]"
        />
      </div>

      {/* Get Tips */}
      <div>
        <div className="absolute left-[44vw] top-[140vh] w-[50.25vw] bg-[#D9D9D9] rounded-[1.38vw] px-[3vw] py-[3vh] text-center">
          <h2 className="text-[2.2vw] font-bold text-black mb-[2vh] font-Gilroy">
            Get Tips
          </h2>
          <div className="flex justify-center">
            <ul className="list-disc text-[1.2vw] text-[#1A1A1A] leading-[1.8vw] font-medium font-Poppins text-left pl-[1.5vw]">
              <li>Personalized advice for your goals</li>
              <li>
                Tips for weight gain, loss, muscle building, or fast recovery
              </li>
              <li>Expert guidance tailored to your needs</li>
            </ul>
          </div>
        </div>
        <img src="src/assets/Get_tips.png" alt="" width={300} className="absolute top-[133vh] left-[16vw]"/>
      </div>
    </div>
  );
};

export default Features;
