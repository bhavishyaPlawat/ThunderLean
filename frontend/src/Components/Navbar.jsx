import React, { useState, useEffect } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../supabaseClient"; // Import Supabase client

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    getSession();

    // Listen for auth state changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    // Cleanup listener on component unmount
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

    const customHandler = () => {
      setIsPwaInstallable(true);
    };

    const installedHandler = () => {
      setIsPwaInstallable(false);
    };

    const alreadyInstalledHandler = () => {
      setIsPwaInstallable(false);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("pwa-installable", customHandler);
    window.addEventListener("pwa-installed", installedHandler);
    window.addEventListener("pwa-already-installed", alreadyInstalledHandler);

    if (
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      setIsPwaInstallable(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("pwa-installable", customHandler);
      window.removeEventListener("pwa-installed", installedHandler);
      window.removeEventListener(
        "pwa-already-installed",
        alreadyInstalledHandler
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("No install prompt available");
      return;
    }

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;

      if (outcome === "accepted") {
        setIsPwaInstallable(false);
        window.deferredPrompt = null;
        console.log("PWA installed successfully");
      } else {
        console.log("PWA installation declined");
      }
    } catch (error) {
      console.error("Error installing PWA:", error);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignInClick = () => {
    navigate("/auth");
    closeMobileMenu();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    closeMobileMenu();
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.15,
      },
    },
  };

  const hamburgerVariants = {
    open: {
      rotate: 180,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="relative px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center hover:cursor-pointer"
        >
          <AiFillThunderbolt className="h-8 w-8 text-purple-600" />
          <span className="ml-2 text-xl font-bold uppercase">ThunderLean</span>
        </div>

        <div className="hidden md:flex items-center font-bold gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition-colors duration-300 ${
                isActive ? "text-[#8C4DCF]" : "text-black hover:text-[#8C4DCF]"
              } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full ${
                isActive ? "after:w-full" : ""
              }`
            }
          >
            Home
          </NavLink>
          <a
            href="/#features"
            className="relative text-black hover:text-[#8C4DCF] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
          >
            Features
          </a>
          <a
            href="/#whyus"
            className="relative text-black hover:text-[#8C4DCF] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
          >
            Why Us?
          </a>
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive
                    ? "text-[#8C4DCF]"
                    : "text-black hover:text-[#8C4DCF]"
                } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full ${
                  isActive ? "after:w-full" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <button
              onClick={handleSignInClick}
              className="px-6 py-2 bg-[#2C2C2C] text-white rounded-md hover:bg-[#3C3C3C] transition-colors"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          )}

          {isPwaInstallable && (
            <button
              onClick={handleInstallClick}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Install App
            </button>
          )}
        </div>

        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variants={hamburgerVariants}
            animate={isMenuOpen ? "open" : "closed"}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mx-4 absolute left-0 right-0 z-[100] md:hidden mt-4 bg-white/50 backdrop-blur-sm border border-black/10 rounded-lg shadow-xl overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex flex-col items-center gap-4 p-6"
              variants={mobileMenuVariants}
            >
              <motion.div variants={menuItemVariants}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative transition-colors duration-300 ${
                      isActive
                        ? "text-[#8C4DCF]"
                        : "text-black hover:text-[#8C4DCF]"
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full ${
                      isActive ? "after:w-full" : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </motion.div>

              <motion.div variants={menuItemVariants}>
                <a
                  href="/#features"
                  className="relative text-black hover:text-[#8C4DCF] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
                  onClick={closeMobileMenu}
                >
                  Features
                </a>
              </motion.div>

              <motion.div variants={menuItemVariants}>
                <a
                  href="/#whyus"
                  className="relative text-black hover:text-[#8C4DCF] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full"
                  onClick={closeMobileMenu}
                >
                  Why Us?
                </a>
              </motion.div>

              {isLoggedIn && (
                <motion.div variants={menuItemVariants}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `relative transition-colors duration-300 ${
                        isActive
                          ? "text-[#8C4DCF]"
                          : "text-black hover:text-[#8C4DCF]"
                      } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-[#8C4DCF] after:transition-all after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full ${
                        isActive ? "after:w-full" : ""
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </NavLink>
                </motion.div>
              )}

              {!isLoggedIn ? (
                <motion.div variants={menuItemVariants} className="w-full mt-2">
                  <motion.button
                    onClick={handleSignInClick}
                    className="w-full px-6 py-3 bg-[#2C2C2C] text-white rounded-md hover:bg-[#3C3C3C] transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  variants={menuItemVariants}
                  className="w-full flex flex-col gap-3 mt-2"
                >
                  <motion.button
                    onClick={() => {
                      navigate("/dashboard");
                      closeMobileMenu();
                    }}
                    className="w-full px-6 py-3 bg-[#8C4DCF] text-white rounded-md hover:bg-[#7C3CBF] transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Dashboard
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </motion.div>
              )}

              {isPwaInstallable && (
                <motion.div variants={menuItemVariants} className="w-full">
                  <motion.button
                    onClick={() => {
                      handleInstallClick();
                      closeMobileMenu();
                    }}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Install App
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
