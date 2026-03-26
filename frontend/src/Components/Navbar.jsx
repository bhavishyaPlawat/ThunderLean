
import React, { useState, useEffect } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
 
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

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

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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
              <NavLink
                to="/#features"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive || currentHash === '#features'
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    navigate('/#features');
                  } else {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Features
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/#whyus"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive || currentHash === '#whyus'
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    navigate('/#whyus');
                  } else {
                    document.getElementById('whyus')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Why Us?
              </NavLink>
              <NavLink
                to="/faqs"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
              >
                FAQs
              </NavLink>
              <NavLink
                to="/#contact"
                className={({ isActive }) =>
                  `transition relative ${
                    isActive || currentHash === '#contact'
                      ? "text-purple-600 after:w-full"
                      : "text-gray-800 dark:text-gray-200 hover:text-purple-600"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full`
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    navigate('/#contact');
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact
              </NavLink>
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
                <NavLink 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/#features"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (window.location.pathname !== '/') {
                      navigate('/#features');
                    } else {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive || currentHash === '#features'
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  Features
                </NavLink>
                <NavLink 
                  to="/about" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/#whyus"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (window.location.pathname !== '/') {
                      navigate('/#whyus');
                    } else {
                      document.getElementById('whyus')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive || currentHash === '#whyus'
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  Why Us?
                </NavLink>
                <NavLink 
                  to="/faqs" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  FAQs
                </NavLink>
                <NavLink
                  to="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (window.location.pathname !== '/') {
                      navigate('/#contact');
                    } else {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={({ isActive }) =>
                    `relative transition font-semibold ${
                      isActive || currentHash === '#contact'
                        ? "text-purple-600"
                        : "text-[#6527a8] dark:text-gray-200 hover:text-purple-600"
                    }`
                  }
                >
                  Contact
                </NavLink>
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
