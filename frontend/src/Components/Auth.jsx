// frontend/src/Components/Auth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import { IoClose } from "react-icons/io5";
import { supabase } from "../supabaseClient";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Check if the user has a profile
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 means no rows found
          console.error("Error checking profile:", error);
        }

        if (profile) {
          // If profile exists, user is returning
          navigate("/home");
        } else {
          // If no profile, it's a new user
          navigate("/profile-setup");
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(from, { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (error) throw error;
        if (data.user) {
          navigate("/profile-setup");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // New function for Google Sign-In
  const signInWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // Redirect back to the app
      },
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
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
              <div className="bg-red-900 bg-opacity-50 text-red-300 p-3 rounded-lg text-sm">
                {error}
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
