
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, 
  FaChevronDown, 
  FaChevronUp, 
  FaRobot, 
  FaCalculator, 
  FaChartBar, 
  FaLightbulb, 
  FaCog, 
  FaShieldAlt, 
  FaThumbsUp, 
  FaThumbsDown, 
  FaQuestionCircle,
  FaEnvelope,
  FaComments
} from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import Navbar from "./Navbar";
import PageFooter from "./PageFooter";
import { useNavigate } from "react-router-dom";

const FAQs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [feedback, setFeedback] = useState({});

  const categories = [
    { id: "all", name: "All Questions", icon: <FaQuestionCircle /> },
    { id: "features", name: "Features", icon: <FaChartBar /> },
    { id: "technical", name: "Technical", icon: <FaCog /> },
    { id: "ai", name: "AI & Tracking", icon: <FaRobot /> },
    { id: "account", name: "Account & Privacy", icon: <FaShieldAlt /> }
  ];

  const faqData = [
    {
      id: 1,
      category: "features",
      question: "What is the AI Calorie Tracker and how does it work?",
      answer: "Our AI Calorie Tracker uses advanced Gemini-powered AI to analyze your meals. Simply describe your meal or upload a photo, and our AI will provide detailed nutritional information including calories, protein, carbs, and fat content. The AI has been trained on thousands of food items to provide accurate estimates."
    },
    {
      id: 2,
      category: "features",
      question: "How accurate is the TDEE Calculator?",
      answer: "Our TDEE Calculator uses scientifically proven formulas (Mifflin-St Jeor equation) to calculate your Total Daily Energy Expenditure. It takes into account your age, gender, weight, height, and activity level to provide personalized calorie targets for maintaining, losing, or gaining weight."
    },
    {
      id: 3,
      category: "ai",
      question: "Can I track meals by taking photos?",
      answer: "Yes! Our AI-powered system can analyze food photos to estimate nutritional content. Simply take a clear photo of your meal, and our AI will identify the food items and provide calorie and macronutrient estimates. For best results, ensure good lighting and clear visibility of all food items."
    },
    {
      id: 4,
      category: "features",
      question: "What kind of personalized tips do I receive?",
      answer: "ThunderLean provides customized advice based on your goals, progress, and dietary patterns. Whether you're aiming for weight loss, muscle gain, or maintenance, our system analyzes your data to offer actionable tips on nutrition timing, portion control, and goal optimization."
    },
    {
      id: 5,
      category: "technical",
      question: "Is my data secure and private?",
      answer: "Absolutely. We use industry-standard encryption and secure servers to protect your personal information. Your meal photos and health data are processed securely and are never shared with third parties. You can delete your data at any time from your account settings."
    },
    {
      id: 6,
      category: "account",
      question: "How do I create an account and get started?",
      answer: "Getting started is simple! Click 'Sign In' on our homepage, create your account with email or Google authentication, complete the profile setup with your basic information and goals, and you're ready to start tracking your fitness journey."
    },
    {
      id: 7,
      category: "features",
      question: "Can I track exercise and workouts?",
      answer: "Yes! ThunderLean includes an Exercise Log feature where you can track your workouts, set exercise goals, and monitor your physical activity. This data integrates with your calorie tracking to provide a complete picture of your energy balance."
    },
    {
      id: 8,
      category: "technical",
      question: "Does ThunderLean work offline?",
      answer: "ThunderLean has Progressive Web App (PWA) capabilities, allowing limited offline functionality. You can view previously loaded data and access basic features, but AI analysis and real-time updates require an internet connection."
    },
    {
      id: 9,
      category: "ai",
      question: "What if the AI doesn't recognize my food?",
      answer: "If our AI can't identify a specific food item, you can manually enter the details or search our comprehensive food database. You can also describe the meal in more detail, and our AI will provide the best possible estimate based on similar foods."
    },
    {
      id: 10,
      category: "features",
      question: "How do I set and modify my fitness goals?",
      answer: "You can set and update your goals anytime in your Dashboard or Settings. Choose from weight loss, weight gain, or maintenance goals, and our system will automatically adjust your daily calorie targets and provide relevant tips."
    },
    {
      id: 11,
      category: "technical",
      question: "Is ThunderLean available as a mobile app?",
      answer: "ThunderLean is a Progressive Web App (PWA) that works seamlessly on all devices. You can install it on your phone like a native app for quick access, and it will work just like a mobile application with offline capabilities."
    },
    {
      id: 12,
      category: "account",
      question: "Can I export my tracking data?",
      answer: "Yes, you can export your nutrition and exercise data from your Settings page. We provide options to download your data in various formats for personal use or to share with healthcare providers."
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleFeedback = (faqId, isHelpful) => {
    setFeedback(prev => ({
      ...prev,
      [faqId]: isHelpful
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen faq-container">
      {/* Background with overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-90"></div> */}
      
      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-8">
        {/* Hero Section */}
        <div className="text-center mb-12 px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <AiFillThunderbolt className="h-12 w-12 text-purple-600" />
            <span className="ml-2 text-3xl font-bold text-white">
              ThunderLean
            </span>
          </div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find answers to common questions about ThunderLean's features and functionality
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-12">
          {/* Search Bar */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all backdrop-blur-md border ${
                    activeCategory === category.id
                      ? "bg-purple-600/80 text-white border-purple-500 shadow-lg"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-white text-lg pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-purple-300" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedItems.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-white/80 leading-relaxed mb-4">
                            {faq.answer}
                          </p>
                          
                          {/* Feedback Section */}
                          <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                            <span className="text-sm text-white/60">Was this helpful?</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleFeedback(faq.id, true)}
                                className={`p-2 rounded-full transition-colors ${
                                  feedback[faq.id] === true
                                    ? "bg-green-500/30 text-green-300"
                                    : "bg-white/10 text-white/60 hover:bg-green-500/20"
                                }`}
                              >
                                <FaThumbsUp size={14} />
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, false)}
                                className={`p-2 rounded-full transition-colors ${
                                  feedback[faq.id] === false
                                    ? "bg-red-500/30 text-red-300"
                                    : "bg-white/10 text-white/60 hover:bg-red-500/20"
                                }`}
                              >
                                <FaThumbsDown size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaQuestionCircle className="mx-auto text-6xl text-white/40 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
              <p className="text-white/60">Try adjusting your search or browse different categories</p>
            </motion.div>
          )}

          {/* Contact Support Section */}
          <motion.div 
            className="mt-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you get the most out of ThunderLean.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                Contact Support
              </motion.button>
              <motion.button 
                onClick={() => navigate('/auth')}
                className="flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaComments />
                Join Community
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
};

export default FAQs;
