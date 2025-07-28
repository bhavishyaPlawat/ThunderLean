import React, { useState } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center hover:cursor-pointer"
        >
          <AiFillThunderbolt className="h-8 w-8 text-purple-600" />
          <span className="ml-2 text-xl font-bold uppercase">ThunderLean</span>
        </div>

        {/* NAV HEADINGS - Desktop */}
        <div className="hidden md:flex items-center font-bold gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#8C4DCF]" : "text-black hover:text-[#8C4DCF]"
            }
          >
            Home
          </NavLink>
          <a href="#features" className="hover:text-[#8C4DCF]">
            Features
          </a>
          <a href="#whyus" className="hover:text-[#8C4DCF]">
            Why Us?
          </a>
        </div>

        {/* BUTTONS - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 bg-[#2C2C2C] text-white rounded-md">
            Sign Up
          </button>
          <button className="px-6 py-2 bg-white text-[#2C2C2C] rounded-md">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#8C4DCF]" : "text-black hover:text-[#8C4DCF]"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <a
              href="#features"
              className="hover:text-[#8C4DCF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#whyus"
              className="hover:text-[#8C4DCF]"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Us?
            </a>
            <button className="w-full px-6 py-2 bg-[#2C2C2C] text-white rounded-md">
              Sign Up
            </button>
            <button className="w-full px-6 py-2 bg-white text-[#2C2C2C] rounded-md border">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
