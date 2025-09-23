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


//Custom hooks
import { useScrollProgress } from './AboutUs/hooks/useScrollProgress';
import { useIntersectionObserver } from './AboutUs/hooks/useIntersectionObserver';
import { useCounterAnimation } from './AboutUs/hooks/useCounterAnimation';


// Data & Styles
import teamData from "./AboutUs/data/teamData.json";
import './AboutUs/styles/style.css';


const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  
  // Refs object
  const refs = {
    heroRef: useRef(null),
    storyRef: useRef(null),
    featuresRef: useRef(null),
    teamRef: useRef(null),
    statsRef: useRef(null),
    ctaRef: useRef(null)
  };
  
  const { heroRef, storyRef, featuresRef, teamRef, statsRef, ctaRef } = refs;
  
  // scroll functionality
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  // Custom hooks
  const { scrollProgress, showScrollTop, scrollToTop } = useScrollProgress();
  const { counters, animateCounters, formatNumber } = useCounterAnimation();
  const { visibleSections, statsVisible } = useIntersectionObserver(refs, animateCounters);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  
  const { teamMembers } = teamData;
  
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

      
    </div>
  )
}

export default AboutUs;