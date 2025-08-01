import React, { useState, useEffect } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This state will now be controlled by our custom event
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);

  useEffect(() => {
    // Listen for our custom event from main.jsx
    const handler = () => {
      setIsPwaInstallable(true);
    };

    window.addEventListener("pwa-installable", handler);
    return () => window.removeEventListener("pwa-installable", handler);
  }, []);

  const handleInstallClick = async () => {
    // Get the saved prompt from the window object
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      // The prompt can't be used again, hide the button
      setIsPwaInstallable(false);
      window.deferredPrompt = null;
    }
  };

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

          {/* --- CORRECTED PWA INSTALL & LOGIN BUTTON LOGIC --- */}
          {isPwaInstallable ? (
            <button
              onClick={handleInstallClick}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Install App
            </button>
          ) : (
            <button className="px-6 py-2 bg-white text-[#2C2C2C] rounded-md">
              Login
            </button>
          )}
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
          {/* ... other mobile nav links */}
          <button className="w-full px-6 py-2 bg-[#2C2C2C] text-white rounded-md">
            Sign Up
          </button>
          {isPwaInstallable ? (
            <button
              onClick={handleInstallClick}
              className="w-full px-6 py-2 bg-purple-600 text-white rounded-md"
            >
              Install App
            </button>
          ) : (
            <button className="w-full px-6 py-2 bg-white text-[#2C2C2C] rounded-md border">
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
