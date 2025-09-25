
import React, { useState, useEffect } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setIsPwaInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setIsPwaInstallable(false);
        window.deferredPrompt = null;
      }
    } catch (error) {
      console.error("Error installing PWA:", error);
    }
  };

  const handleSignInClick = () => {
    navigate("/auth");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    setIsMenuOpen(false);
  };

  // Animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <header className="fixed top-0  z-50 w-full ">
      <nav className="relative mx-auto max-w-7xl  lg:px-8 py-4">
        {/* Glassmorphism container */}
        <div className="relative w-full backdrop-blur-xl bg-white/70 dark:bg-indigo-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-full px-4 py-3 shadow-md">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <AiFillThunderbolt className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold uppercase">
                ThunderLean
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
              >
                Home
              </NavLink>
              <a
                href="/#features"
                className="relative text-gray-800 dark:text-gray-200 hover:text-purple-600 transition"
              >
                Features
              </a>
              <a
                href="/about"
                className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition"
              >
                About Us
              </a>
              <a
                href="/#whyus"
                className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition"
              >
                Why Us?
              </a>
              <a
                href="/faqs"
                className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition"
              >
                FAQs
              </a>
              <a
                href="/#contact"
                className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition"
              >
                Contact
              </a>
              {isLoggedIn && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `transition relative ${
                      isActive
                        ? "text-purple-600 after:w-full"
                        : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {!isLoggedIn ? (
                <button
                  onClick={handleSignInClick}
                  className="px-6 py-2 bg-[#7333b8] cursor-pointer text-white rounded-full hover:bg-[#6527a8] transition-transform transform hover:scale-105 duration-300"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                >
                  Logout
                </button>
              )}
              {isPwaInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  Install App
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  // <AiOutlineMenu size={24} />
                  <RiMenu3Fill size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mt-3  md:hidden  backdrop-blur-xl bg-white/100 dark:bg-indigo-900/50 border border-indigo-200/30 dark:border-gray-700/30  rounded-2xl p-6 shadow-lg"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-4">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}
                className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  Home
                </NavLink>
                <a href="/#features" onClick={() => setIsMenuOpen(false)}
                 className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  Features
                </a>
                <a href="/about" onClick={() => setIsMenuOpen(false)}
                 className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  About Us
                </a>
                <a href="/#whyus" onClick={() => setIsMenuOpen(false)}
                 className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  Why Us?
                </a>
                <a href="/faqs" onClick={() => setIsMenuOpen(false)}
                 className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  FAQs
                </a>
                <a href="/#contact" onClick={() => setIsMenuOpen(false)}
                 className="relative text-[#6527a8] dark:text-gray-200 hover:text-purple-600 transition font-semibold">
                  Contact
                </a>
                {isLoggedIn && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                )}

                {!isLoggedIn ? (
                  <button
                    onClick={handleSignInClick}
                    className="w-full px-6 py-3 bg-[#7333b8] text-white rounded-full hover:bg-[#6527a8] transition"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                  >
                    Logout
                  </button>
                )}
                {isPwaInstallable && (
                  <button
                    onClick={handleInstallClick}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  >
                    Install App
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;