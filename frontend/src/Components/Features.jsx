
import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ title, items, imageUrl, imageAlt, reverse = false }) => {
  const flexDirection = reverse ? "md:flex-row-reverse" : "md:flex-row";

  const textVariants = {
    hidden: {
      opacity: 0,
      x: reverse ? 80 : -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: reverse ? -80 : 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className={`flex flex-col ${flexDirection} items-center gap-8 lg:gap-16`}>
      {/* Text Box */}
      <motion.div
        className="md:w-1/2 bg-[#D9D9D9] rounded-2xl p-6 lg:p-8 text-center shadow-md"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
          {title}
        </h3>
        <ul className="list-disc text-sm sm:text-base text-[#1A1A1A] font-medium text-left pl-5 space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* Image Box */}
      <motion.div
        className="md:w-1/2 flex justify-center p-4"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <img src={imageUrl} alt={imageAlt} className="w-48 h-auto sm:w-56" />
      </motion.div>
    </div>
  );
};


const Features = () => {
  const featureData = [
    {
      title: "TDEE Calculator",
      items: [
        "Calculate your Total Daily Energy Expenditure.",
        "Personalized calorie needs based on your input.",
        "Simple, fast, and tailored to your fitness goals.",
      ],
      imageUrl:
        "/assets/WhatsApp_Image_2025-07-27_at_14.37.47_210d55e7-removebg-preview.png",
      imageAlt: "TDEE Calculator",
    },
    {
      title: "AI Calorie Tracker",
      items: [
        "AI-powered meal tracking with photo recognition.",
        "Log food effortlessly, no manual calculations.",
        "Smart insights to keep your diet on track.",
      ],
      imageUrl: "/assets/ai_tracker.png",
      imageAlt: "AI Calorie Tracker",
      reverse: true,
    },
    {
      title: "Detailed Dashboard",
      items: [
        "Comprehensive view of your health progress.",
        "Track calorie trends and fitness metrics.",
        "Actionable insights to optimize your goals.",
      ],
      imageUrl: "/assets/Detailed_Dashboard.png",
      imageAlt: "Detailed Dashboard",
    },
    {
      title: "Get Tips",
      items: [
        "Personalized advice for your goals.",
        "Tips for weight gain, loss, or muscle building.",
        "Expert guidance tailored to your needs.",
      ],
      imageUrl: "/assets/Get_tips.png",
      imageAlt: "Get Tips",
      reverse: true,
    },
  ];

  // The `py-16` class has been changed to `pb-16` to remove the top padding.
  return (
    <div id="features" className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-black">
          Features
        </h2>
      </div>
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {featureData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;
