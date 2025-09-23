/**
 * PWA Service Utility
 * 
 * Handles service worker registration, updates, and PWA-related functionality
 */

class PWAService {
  constructor() {
    this.registration = null;
    this.updateAvailable = false;
    this.updateCallbacks = [];
  }

  /**
   * Register service worker
   */
  async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return null;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', this.registration);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdateFound();
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        this.handleControllerChange();
      });

      return this.registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  /**
   * Handle service worker update found
   */
  handleUpdateFound() {
    const newWorker = this.registration.installing;
    
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // New content is available
          this.updateAvailable = true;
          this.notifyUpdateCallbacks();
        } else {
          // Content is cached for the first time
          console.log('Content is cached for offline use');
        }
      }
    });
  }

  /**
   * Handle controller change
   */
  handleControllerChange() {
    console.log('Service Worker controller changed');
    // Reload the page to get the new content
    window.location.reload();
  }

  /**
   * Skip waiting and activate new service worker
   */
  async skipWaiting() {
    if (!this.registration || !this.registration.waiting) {
      return;
    }

    try {
      // Send message to waiting service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      this.updateAvailable = false;
    } catch (error) {
      console.error('Failed to skip waiting:', error);
    }
  }

  /**
   * Subscribe to update notifications
   */
  onUpdateAvailable(callback) {
    this.updateCallbacks.push(callback);
  }

  /**
   * Notify all update callbacks
   */
  notifyUpdateCallbacks() {
    this.updateCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Update callback error:', error);
      }
    });
  }

  /**
   * Check if app is running as PWA
   */
  isRunningAsPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }

  /**
   * Get PWA display mode
   */
  getDisplayMode() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return 'standalone';
    }
    if (window.matchMedia('(display-mode: minimal-ui)').matches) {
      return 'minimal-ui';
    }
    if (window.matchMedia('(display-mode: fullscreen)').matches) {
      return 'fullscreen';
    }
    return 'browser';
  }

  /**
   * Request notification permission
   */
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Show notification
   */
  showNotification(title, options = {}) {
    if (Notification.permission !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    const defaultOptions = {
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      requireInteraction: false,
      ...options
    };

    try {
      new Notification(title, defaultOptions);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush() {
    if (!this.registration) {
      console.log('Service Worker not registered');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'YOUR_VAPID_PUBLIC_KEY_HERE' // Replace with your VAPID public key
        )
      });

      console.log('Push subscription successful:', subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  /**
   * Convert VAPID key
   */
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * Get app version
   */
  async getAppVersion() {
    if (!this.registration) {
      return null;
    }

    try {
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.version);
        };
        this.registration.active.postMessage(
          { type: 'GET_VERSION' },
          [messageChannel.port2]
        );
      });
    } catch (error) {
      console.error('Failed to get app version:', error);
      return null;
    }
  }

  /**
   * Clear all caches
   */
  async clearAllCaches() {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }

  /**
   * Get cache storage usage
   */
  async getCacheStorageUsage() {
    if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
      return null;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage,
        available: estimate.quota,
        percentage: (estimate.usage / estimate.quota) * 100
      };
    } catch (error) {
      console.error('Failed to get storage usage:', error);
      return null;
    }
  }
}

// Create singleton instance
const pwaService = new PWAService();

export default pwaService;
