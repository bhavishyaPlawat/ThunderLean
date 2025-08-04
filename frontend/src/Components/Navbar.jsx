import React, { useState, useEffect } from "react";
import {
  AiFillThunderbolt,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userData");

      if (token && user) {
        setIsLoggedIn(true);
        if (
          location.pathname !== "/dashboard" &&
          location.pathname !== "/auth" &&
          !location.pathname.startsWith("/dashboard") &&
          !location.pathname.startsWith("/tdee-calculator") &&
          !location.pathname.startsWith("/ai-track") &&
          !location.pathname.startsWith("/get-tip")
        ) {
          navigate("/dashboard");
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [location.pathname, navigate]);

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

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
    closeMobileMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/");
    closeMobileMenu();
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
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-[#8C4DCF]" : "text-black hover:text-[#8C4DCF]"
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <button
              onClick={handleGetStartedClick}
              className="px-6 py-2 bg-[#2C2C2C] text-white rounded-md hover:bg-[#3C3C3C] transition-colors"
            >
              Get Started
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-[#8C4DCF] text-white rounded-md hover:bg-[#7C3CBF] transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
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

            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#8C4DCF]"
                    : "text-black hover:text-[#8C4DCF]"
                }
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            )}

            {!isLoggedIn ? (
              <button
                onClick={handleGetStartedClick}
                className="w-full px-6 py-2 bg-[#2C2C2C] text-white rounded-md hover:bg-[#3C3C3C] transition-colors"
              >
                Get Started
              </button>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    closeMobileMenu();
                  }}
                  className="w-full px-6 py-2 bg-[#8C4DCF] text-white rounded-md hover:bg-[#7C3CBF] transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {isPwaInstallable && (
              <button
                onClick={() => {
                  handleInstallClick();
                  closeMobileMenu();
                }}
                className="w-full px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
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
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
