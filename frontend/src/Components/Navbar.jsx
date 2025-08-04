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
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsPwaInstallable(true);
    };
    window.addEventListener("pwa-installable", handler);
    return () => window.removeEventListener("pwa-installable", handler);
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      setIsPwaInstallable(false);
      window.deferredPrompt = null;
    }
  };

  // Function to close the menu, useful for mobile navigation
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
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
          {isPwaInstallable ? (
            <button
              onClick={handleInstallClick}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Install App
            </button>
          ) : (
            <button className="px-6 py-2 bg-white text-[#2C2C2C] rounded-md border">
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

      {/* --- CORRECTED & COMPLETE Mobile Menu --- */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            {/* All Nav links are now correctly inside the mobile menu */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#8C4DCF]" : "text-black hover:text-[#8C4DCF]"
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <a
              href="#features"
              className="hover:text-[#8C4DCF]"
              onClick={closeMobileMenu}
            >
              Features
            </a>
            <a
              href="#whyus"
              className="hover:text-[#8C4DCF]"
              onClick={closeMobileMenu}
            >
              Why Us?
            </a>
            {/* All buttons are now correctly inside the mobile menu */}
            <button className="w-full px-6 py-2 bg-[#2C2C2C] text-white rounded-md">
              Sign Up
            </button>
            {isPwaInstallable ? (
              <button
                onClick={() => {
                  handleInstallClick();
                  closeMobileMenu();
                }}
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
