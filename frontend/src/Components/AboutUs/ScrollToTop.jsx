import React from "react";
import { ChevronUp } from "lucide-react";

const ScrollTopButton = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 animate-bounce-subtle group"
    >
      <ChevronUp className="w-6 h-6 mx-auto group-hover:animate-bounce" />
    </button>
  );
};

export default ScrollTopButton;
