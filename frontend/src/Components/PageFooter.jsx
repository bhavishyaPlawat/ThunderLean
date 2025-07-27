import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageFooter = () => {
  
  return (
    <div className="relative">
        <footer className="absolute top-[120vh]  w-full bg-[#1F2937] text-white pt-28 pb-10 overflow-hidden ">
      <div className="">
        {/* Top Angle Strip */}
        <div
          className="absolute -top-1 left-0 w-full"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 25%)" }}
        ></div>

        {/* Footer Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h1 className="text-3xl font-bold tracking-wide text-white">
                Thunderlean
              </h1>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                AI-powered insights to elevate your fitness journey.
              </p>
              {/* Optional: Social Icons Placeholder */}
              <div className="flex gap-4 mt-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full" />
                <div className="w-8 h-8 bg-gray-700 rounded-full" />
                <div className="w-8 h-8 bg-gray-700 rounded-full" />
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-lg tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                {["Features", "Pricing", "Updates"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                {["About", "Contact Us", "Careers"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                {["Privacy Policy", "Terms of Service"].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Thunderlean. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    
  );
};

export default PageFooter;
