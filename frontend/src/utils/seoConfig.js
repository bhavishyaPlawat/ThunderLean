// SEO Configuration for different pages
export const seoConfig = {
  home: {
    title: "ThunderLean - AI-Powered Fitness & Nutrition Tracker",
    description: "Transform your fitness journey with ThunderLean's AI-powered calorie tracking, meal analysis, and personalized nutrition insights. Track your progress and achieve your health goals.",
    keywords: "fitness tracker, calorie counter, nutrition app, AI meal analysis, weight loss, health tracking, diet planner, exercise log, ThunderLean",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com",
    type: "website"
  },
  auth: {
    title: "Sign In - ThunderLean",
    description: "Sign in to your ThunderLean account to access AI-powered fitness tracking, meal analysis, and personalized nutrition insights.",
    keywords: "sign in, login, ThunderLean, fitness tracker, nutrition app",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/auth",
    type: "website"
  },
  dashboard: {
    title: "Dashboard - ThunderLean",
    description: "View your fitness progress, track calories, and get personalized insights with ThunderLean's AI-powered dashboard.",
    keywords: "fitness dashboard, calorie tracking, progress tracking, ThunderLean",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/dashboard",
    type: "website"
  },
  foodLog: {
    title: "Food Log - ThunderLean",
    description: "Log your meals and get AI-powered nutrition analysis with ThunderLean's smart food tracking system.",
    keywords: "food log, meal tracking, nutrition analysis, calorie counting, ThunderLean",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/food-log",
    type: "website"
  },
  exerciseLog: {
    title: "Exercise Log - ThunderLean",
    description: "Track your workouts and exercise routines with ThunderLean's comprehensive exercise logging system.",
    keywords: "exercise log, workout tracking, fitness routine, ThunderLean",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/exercise-log",
    type: "website"
  },
  community: {
    title: "Community - ThunderLean",
    description: "Join the ThunderLean community to share your fitness journey, get tips, and connect with like-minded individuals.",
    keywords: "fitness community, health tips, workout sharing, ThunderLean community",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/community",
    type: "website"
  },
  settings: {
    title: "Settings - ThunderLean",
    description: "Customize your ThunderLean experience with personalized settings and preferences.",
    keywords: "settings, preferences, ThunderLean configuration",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/settings",
    type: "website"
  },
  profileSetup: {
    title: "Profile Setup - ThunderLean",
    description: "Set up your ThunderLean profile to get personalized fitness recommendations and track your health goals.",
    keywords: "profile setup, fitness goals, health tracking, ThunderLean",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/profile-setup",
    type: "website"
  },
  forgotPassword: {
    title: "Forgot Password - ThunderLean",
    description: "Reset your ThunderLean account password to regain access to your fitness tracking dashboard.",
    keywords: "forgot password, reset password, ThunderLean account",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/forgot-password",
    type: "website"
  },
  resetPassword: {
    title: "Reset Password - ThunderLean",
    description: "Create a new password for your ThunderLean account to secure your fitness data.",
    keywords: "reset password, new password, ThunderLean security",
    image: "https://thunderlean.com/og-image.png",
    url: "https://thunderlean.com/reset-password",
    type: "website"
  }
};

// Function to get SEO config for a specific page
export const getSEOConfig = (pageName) => {
  return seoConfig[pageName] || seoConfig.home;
};

// Function to generate dynamic SEO for user profiles
export const getUserProfileSEO = (username, userData) => {
  return {
    title: `${username}'s Profile - ThunderLean`,
    description: `View ${username}'s fitness journey and progress on ThunderLean. ${userData?.bio || 'Join the community and start your own fitness transformation.'}`,
    keywords: `${username}, fitness profile, ThunderLean user, health journey`,
    image: userData?.avatar || "https://thunderlean.com/og-image.png",
    url: `https://thunderlean.com/profile/${username}`,
    type: "profile"
  };
};
