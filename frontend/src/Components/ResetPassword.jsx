// frontend/src/Components/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLock, AiFillThunderbolt } from "react-icons/ai";
import { supabase } from "../supabaseClient";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Supabase sends the token in the URL fragment, so we listen for the session
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        // The user is in the password recovery flow
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // This function updates the user's password
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setMessage(
        "Your password has been reset successfully! You can now sign in."
      );
      setTimeout(() => navigate("/auth"), 3000);
    } catch (err) {
      setError(err.message || "Invalid or expired token. Please try again.");
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
          Reset Your Password
        </h2>
        <p className="text-white/80 text-center mb-8">
          Choose a new, strong password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <AiOutlineLock className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50" />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border-2 border-transparent focus:border-purple-500 rounded-full py-3 pl-12 pr-4 outline-none transition"
              required
            />
          </div>
          <div className="relative mb-6">
            <AiOutlineLock className="absolute top-1/2 -translate-y-1/2 left-4 text-white/50" />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
