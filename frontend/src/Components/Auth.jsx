// frontend/src/Components/Auth.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiFillThunderbolt } from "react-icons/ai";
import { supabase } from "../supabaseClient"; // Import our new client

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        response = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              // This 'data' will be used by our trigger to create a profile
              full_name: name,
            },
          },
        });
      }
      if (response.error) throw response.error;
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
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
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
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
