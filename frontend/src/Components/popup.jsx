// frontend/src/Components/Popup.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle, IoWarning } from "react-icons/io5";

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  const icon = isSuccess ? (
    <IoCheckmarkCircle className="text-green-500 h-6 w-6" />
  ) : (
    <IoWarning className="text-red-500 h-6 w-6" />
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className="fixed bottom-5 right-5 z-50"
      >
        <div className="flex items-center bg-[#282828] border border-gray-700 rounded-xl shadow-lg p-4">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
