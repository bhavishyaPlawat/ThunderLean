import { useState, useEffect } from 'react';

export const useIntersectionObserver = (refs, onStatsVisible) => {
  const [visibleSections, setVisibleSections] = useState({
    story: false,
    features: false,
    team: false,
    cta: false
  });
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const sectionHandlers = new Map([
      [refs.storyRef.current, () => setVisibleSections(prev => ({ ...prev, story: true }))],
      [refs.featuresRef.current, () => setVisibleSections(prev => ({ ...prev, features: true }))],
      [refs.teamRef.current, () => setVisibleSections(prev => ({ ...prev, team: true }))],
      [refs.ctaRef.current, () => setVisibleSections(prev => ({ ...prev, cta: true }))],
      [refs.statsRef.current, () => {
        if (!statsVisible) {
          setStatsVisible(true);
          onStatsVisible();
        }
      }]
    ]);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const handler = sectionHandlers.get(entry.target);
          if (handler) handler();
        }
      });
    }, observerOptions);

    Object.values(refs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs, statsVisible, onStatsVisible]);

  return { visibleSections, statsVisible };
};
