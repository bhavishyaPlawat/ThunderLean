import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ArrowDown } from 'lucide-react';

import Navbar from "./Navbar";
import PageFooter from "./PageFooter";
import HeroSection from './AboutUs/HeroSection';
import StorySection from './AboutUs/StorySection';
import FeaturesSection from "./AboutUs/FeatureSection";
import TeamSection from "./AboutUs/TeamSection";
import StatsSection from "./AboutUs/StatsSection";
import CTASection from "./AboutUs/CTASection";
import ScrollTopButton from "./AboutUs/ScrollToTop";
import FloatingNav from './AboutUs/FloatingNav';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  const [statsVisible, setStatsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    story: false,
    features: false,
    team: false,
    cta: false
  });
  const [counters, setCounters] = useState({
    users: 0,
    calories: 0,
    accuracy: 0,
    support: 0
  });

  const statsRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

  // scroll functionality
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Scroll progress and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Intersection observer for all sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetRef = entry.target;

          if (targetRef === storyRef.current) {
            setVisibleSections(prev => ({ ...prev, story: true }));
          } else if (targetRef === featuresRef.current) {
            setVisibleSections(prev => ({ ...prev, features: true }));
          } else if (targetRef === teamRef.current) {
            setVisibleSections(prev => ({ ...prev, team: true }));
          } else if (targetRef === ctaRef.current) {
            setVisibleSections(prev => ({ ...prev, cta: true }));
          } else if (targetRef === statsRef.current && !statsVisible) {
            setStatsVisible(true);
            animateCounters();
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    [storyRef, featuresRef, teamRef, statsRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [statsVisible]);

  const animateCounters = () => {
    const targets = {
      users: 1000000,
      calories: 50000000,
      accuracy: 98,
      support: 24
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        users: Math.floor(targets.users * progress),
        calories: Math.floor(targets.calories * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        support: Math.floor(targets.support * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          users: targets.users,
          calories: targets.calories,
          accuracy: targets.accuracy,
          support: targets.support
        });
      }
    }, stepDuration);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
  };

  const teamMembers = [
    {
      name: "Sofia",
      role: "Founder & CEO",
      image: "",
      description: "Passionate about revolutionizing fitness through AI technology.",
      gradient: "from-purple-500 to-blue-600"
    },
    {
      name: "Nina",
      role: "Head of AI Development",
      image: "",
      description: "Expert in machine learning and nutritional science.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Vaibhav",
      role: "Head of Product",
      image: "",
      description: "Former professional athlete with 10+ years in fitness tech.",
      gradient: "from-purple-600 to-pink-500"
    },
    {
      name: "Harry",
      role: "Nutritionist & Advisor",
      image: "",
      description: "Certified nutritionist with expertise in personalized meal planning.",
      gradient: "from-blue-600 to-purple-500"
    }
  ];


  return (
    <div className="bg-[#E3E7F0] min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation Buttons */}
      <FloatingNav
        sections={[
          // { ref: heroRef, label: 'Hero', icon: '🏠' },
          { ref: storyRef, label: 'Story', icon: '📖' },
          { ref: featuresRef, label: 'Features', icon: '⚡' },
          { ref: ctaRef, label: 'CTA', icon: '🚀' }
        ]}
        scrollToSection={scrollToSection}
      />
      
      {/* HeroSection */}
      <HeroSection heroRef={heroRef} scrollToSection={scrollToSection} storyRef={storyRef} isVisible={isVisible} />

      {/* Mission, Vision, Our Values */}
      <StorySection
        storyRef={storyRef}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        visibleSections={visibleSections}
      // scrollToSection={() => scrollToSection(storyRef)}
      />

      {/* Feature Section */}
      <FeaturesSection visible={visibleSections.features} ref={featuresRef} />

      {/* Team Section */}
      <TeamSection visible={visibleSections.team} ref={teamRef} teamMembers={teamMembers} />

      {/* Stats Section */}
      <StatsSection visible={statsVisible} ref={statsRef} counters={counters} formatNumber={formatNumber} />

      {/* Call To Action */}
      <CTASection visible={visibleSections.cta} ref={ctaRef} />

      {/* Scroll to Top Button */}
      <ScrollTopButton show={showScrollTop} onClick={scrollToTop} />
      {/* Footer */}
      <PageFooter />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
        .animate-width-expand { animation: width-expand 1s ease forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .bg-300% { background-size: 300%; }
        
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}

export default AboutUs;