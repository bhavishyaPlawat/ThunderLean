import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="ml-[15%] max-w-[70%] max-h-[4.44vh]">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="w-[8.33vw] h-[3.67vh] flex justify-between items-center hover:cursor-pointer"
        >
          <AiFillThunderbolt className="h-[3.67vh] w-[3.67vw]" />
          <span className="uppercase h-[2.67vh] w-[6.04vw]">ThunderLean</span>
        </div>

        {/* NAV HEADINGS */}
        <div className="w-[21.29vw] flex justify-between items-center font-bold gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#8C4DCF]" : "text-black"
            }
          >
            Home
          </NavLink>

          {/* Link to #features on the same page */}
          <a href="#features" className="hover:text-[#8C4DCF]">
            Features
          </a>

          {/* Optional: Link to another section */}
          <a href="#whyus" className="hover:text-[#8C4DCF]">
            Why Us?
          </a>
        </div>

        {/* BUTTONS */}
        <div className="w-[12.92vw] h-[4.44vh] flex justify-between">
          <button className="w-[6.18vw] h-[4.44vh] bg-[#2C2C2C] text-[#F5F5F5] rounded-md flex items-center justify-center">
            Sign Up
          </button>
          <button className="w-[5.07vw] h-[4.44vh] bg-white text-[#2C2C2C] rounded-md flex items-center justify-center">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
