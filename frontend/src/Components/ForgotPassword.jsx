// frontend/src/Components/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiFillThunderbolt } from "react-icons/ai";
import { supabase } from "../supabaseClient"; // Import the Supabase client

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // This single line handles sending the reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // URL to your reset password page
      });

      if (error) throw error;

      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-container flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
        <Link to="/" className="flex items-center justify-center mb-6">
          <AiFillThunderbolt className="h-8 w-8 text-purple-400" />
          <span className="ml-2 text-2xl font-bold uppercase">ThunderLean</span>
        </Link>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Forgot Password?
        </h2>
        <p className="text-white/80 text-center mb-8">
          No worries! Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <AiOutlineMail className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 border-2 border-transparent focus:border-purple-500 rounded-full py-3 pl-12 pr-4 outline-none transition"
              required
            />
          </div>

          {message && (
            <p className="text-green-400 text-sm text-center mb-4">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-sm text-white/80 mt-8">
          Remembered your password?{" "}
          <Link
            to="/auth"
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
