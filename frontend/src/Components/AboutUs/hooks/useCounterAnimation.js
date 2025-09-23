import { useState } from 'react';

export const useCounterAnimation = () => {
  const [counters, setCounters] = useState({
    users: 0,
    calories: 0,
    accuracy: 0,
    support: 0
  });

  const animateCounters = () => {
    const targets = { users: 1000000, calories: 50000000, accuracy: 98, support: 24 };
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
        setCounters(targets);
      }
    }, stepDuration);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num.toString();
  };

  return { counters, animateCounters, formatNumber };
};
