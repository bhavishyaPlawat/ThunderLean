/**
 * Performance Monitor for ThunderLean PWA
 * 
 * Monitors and reports performance metrics for favicon loading,
 * PWA functionality, and overall app performance.
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      faviconLoadTime: null,
      serviceWorkerRegistration: null,
      cacheHitRate: 0,
      offlineUsage: 0,
      installPromptShown: 0,
      installPromptAccepted: 0,
    };
    
    this.observers = [];
    this.init();
  }

  init() {
    this.measureFaviconPerformance();
    this.measureServiceWorkerPerformance();
    this.setupPerformanceObservers();
    this.trackPWAEvents();
  }

  /**
   * Measure favicon loading performance
   */
  measureFaviconPerformance() {
    const startTime = performance.now();
    
    // Check if favicons are loaded
    const checkFaviconLoad = () => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.addEventListener('load', () => {
          this.metrics.faviconLoadTime = performance.now() - startTime;
          console.log(`Favicon loaded in ${this.metrics.faviconLoadTime}ms`);
        });
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkFaviconLoad);
    } else {
      checkFaviconLoad();
    }
  }

  /**
   * Measure service worker performance
   */
  measureServiceWorkerPerformance() {
    if ('serviceWorker' in navigator) {
      const startTime = performance.now();
      
      navigator.serviceWorker.ready.then((registration) => {
        this.metrics.serviceWorkerRegistration = performance.now() - startTime;
        console.log(`Service Worker ready in ${this.metrics.serviceWorkerRegistration}ms`);
      });
    }
  }

  /**
   * Setup Performance Observer for Core Web Vitals
   */
  setupPerformanceObservers() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.log('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.log('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.log('CLS observer not supported');
      }
    }
  }

  /**
   * Track PWA-specific events
   */
  trackPWAEvents() {
    // Track install prompt events
    window.addEventListener('beforeinstallprompt', (e) => {
      this.metrics.installPromptShown++;
      console.log('Install prompt shown');
    });

    window.addEventListener('appinstalled', () => {
      this.metrics.installPromptAccepted++;
      console.log('App installed');
    });

    // Track offline usage
    window.addEventListener('online', () => {
      console.log('App back online');
    });

    window.addEventListener('offline', () => {
      this.metrics.offlineUsage++;
      console.log('App went offline');
    });

    // Track service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_HIT') {
          this.metrics.cacheHitRate++;
        }
      });
    }
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connectionType: navigator.connection?.effectiveType || 'unknown',
      memoryUsage: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
      } : null,
    };
  }

  /**
   * Send performance data to analytics
   */
  sendPerformanceData() {
    const report = this.getPerformanceReport();
    
    // Send to your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metrics', {
        event_category: 'PWA',
        event_label: 'Performance Report',
        custom_map: {
          favicon_load_time: report.faviconLoadTime,
          sw_registration_time: report.serviceWorkerRegistration,
          cache_hit_rate: report.cacheHitRate,
          offline_usage: report.offlineUsage,
        }
      });
    }

    // Log to console for debugging
    console.log('Performance Report:', report);
  }

  /**
   * Monitor resource loading
   */
  monitorResourceLoading() {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name.includes('favicon') || entry.name.includes('icon')) {
              console.log(`Icon loaded: ${entry.name} in ${entry.duration}ms`);
            }
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (e) {
        console.log('Resource observer not supported');
      }
    }
  }

  /**
   * Check PWA readiness
   */
  checkPWAReadiness() {
    const checks = {
      serviceWorker: 'serviceWorker' in navigator,
      manifest: document.querySelector('link[rel="manifest"]') !== null,
      https: location.protocol === 'https:' || location.hostname === 'localhost',
      favicon: document.querySelector('link[rel="icon"]') !== null,
      appleTouchIcon: document.querySelector('link[rel="apple-touch-icon"]') !== null,
      themeColor: document.querySelector('meta[name="theme-color"]') !== null,
    };

    const score = Object.values(checks).filter(Boolean).length / Object.keys(checks).length;
    
    console.log('PWA Readiness Score:', score * 100 + '%');
    console.log('PWA Checks:', checks);
    
    return { score, checks };
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (e) {
        console.log('Error disconnecting observer:', e);
      }
    });
    this.observers = [];
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Send performance data periodically
setInterval(() => {
  performanceMonitor.sendPerformanceData();
}, 60000); // Every minute

export default performanceMonitor;
