import { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../apiClient";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  // useEffect(() => {
  //   // Auth state management would need to be implemented separately
  //   // For now, we'll handle navigation in the handleSubmit function
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (isLogin) {
        const response = await apiClient.signIn(email, password);
        if (response.token) {
          // Show success message for login
          setSuccessMessage("✨ Login successful! Welcome back...");
          
          // Check if user has profile and redirect after showing message
          setTimeout(async () => {
            try {
              await apiClient.getProfile();
              navigate("/home");
            } catch (profileError) {
              // No profile found, redirect to profile setup
              console.log("No profile found, redirecting to setup...");
              navigate("/profile-setup");
            }
          }, 2000); // Wait 2 seconds to show success message
          return; // Prevent further error handling
        }
      } else {
        const response = await apiClient.signUp(email, password, name);
        if (response.token) {
          // Show success message for registration
          setSuccessMessage("🎉 Registration successful! Please login to continue...");
          
          // Clear token and redirect to login after showing message
          apiClient.signOut();
          setTimeout(() => {
            setIsLogin(true);
            setEmail("");
            setPassword("");
            setName("");
            setSuccessMessage("");
          }, 2000); // Wait 2 seconds to show success message
          return;
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Google OAuth when component mounts
  useEffect(() => {
    console.log("Auth component mounted");
    console.log("Google client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
    console.log("Google object:", typeof google !== 'undefined' ? 'Available' : 'Not available');
    
    const initializeGoogleAuth = () => {
      console.log("Initializing Google Auth...");
      if (typeof google !== 'undefined' && google.accounts) {
        try {
          google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true
          });
          console.log("Google Auth initialized successfully");
        } catch (error) {
          console.error("Error initializing Google Auth:", error);
        }
      } else {
        console.log("Google accounts not available");
      }
    };

    // Wait for Google script to load
    if (typeof google !== 'undefined') {
      initializeGoogleAuth();
    } else {
      console.log("Waiting for Google script to load...");
      // Wait for Google script to load
      const checkGoogle = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts) {
          console.log("Google script loaded, initializing...");
          initializeGoogleAuth();
          clearInterval(checkGoogle);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogle);
        console.log("Google script loading timeout");
      }, 10000);
    }
  }, []);

  // Google Sign-In implementation
  const signInWithGoogle = async () => {
    console.log("Google Sign-In button clicked");
    console.log("Google available:", typeof google !== 'undefined');
    console.log("Google accounts available:", typeof google !== 'undefined' && google.accounts);
    console.log("Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
    
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (typeof google !== 'undefined' && google.accounts) {
        console.log("Attempting Google Sign-In...");
        
        // Create a temporary div and render the Google Sign-In button
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '-9999px';
        document.body.appendChild(tempDiv);
        
        // Render the Google Sign-In button
        google.accounts.id.renderButton(tempDiv, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 250
        });
        
        // Find and click the button
        setTimeout(() => {
          const button = tempDiv.querySelector('div[role="button"]');
          if (button) {
            console.log("Clicking Google Sign-In button...");
            button.click();
            
            // Clean up after a delay
            setTimeout(() => {
              if (document.body.contains(tempDiv)) {
                document.body.removeChild(tempDiv);
              }
            }, 2000);
          } else {
            console.error("Could not find Google sign-in button");
            setError("Failed to open Google Sign-In popup. Please try again.");
            setIsLoading(false);
            if (document.body.contains(tempDiv)) {
              document.body.removeChild(tempDiv);
            }
          }
        }, 100);
        
      } else {
        console.log("Google not available");
        setError("Google Sign-In is not available. Please refresh the page and try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Failed to initialize Google Sign-In. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleCallback = async (response) => {
    console.log("Google callback received:", response);
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      const credential = response.credential;
      console.log("Using credential from response:", credential.substring(0, 50) + "...");

      console.log("Sending credential to backend...");
      const result = await apiClient.signInWithGoogle(credential);
      console.log("Backend response:", result);
      
      if (result.token) {
        setSuccessMessage("✨ Google Sign-In successful! Welcome...");
        
        // Check if user has profile and redirect after showing message
        setTimeout(async () => {
          try {
            await apiClient.getProfile();
            navigate("/home");
          } catch (profileError) {
            // No profile found, redirect to profile setup
            console.log("No profile found, redirecting to setup...");
            navigate("/profile-setup");
          }
        }, 2000);
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError(err.message || "Google Sign-In failed. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMessage("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 auth-container flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center flex justify-center items-center flex-col mb-8">
          <div className="flex items-center justify-center mb-4">
            <AiFillThunderbolt className="h-12 w-12 text-purple-600" />
            <span className="ml-2 text-3xl font-bold text-white">
              ThunderLean
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back!" : "Join ThunderLean"}
          </h1>
          <p className="text-white mt-2">
            {isLogin
              ? "Sign in to continue your fitness journey"
              : "Start your fitness journey today"}
          </p>
        </div>
        <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
          <button
            onClick={() => navigate("/")}
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <IoClose size={24} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-shake flex items-center gap-3 border-2 border-pink-300">
                <div className="flex-shrink-0">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-base">{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.6)] transform animate-slideIn flex items-center gap-3 border-2 border-purple-300">
                <div className="relative flex-shrink-0">
                  <svg className="w-8 h-8 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="font-bold text-base">{successMessage}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#1f1f1f] rounded-full px-2 text-gray-400">
                OR
              </span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <div>
            <button
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-white/90 text-gray-800 font-semibold rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50"
            >
              <FaGoogle className="mr-3" />
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </button>
            {/* Hidden div for Google button rendering */}
            <div id="google-signin-button" style={{ display: 'none' }}></div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
          <p className="text-sm text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-purple-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
