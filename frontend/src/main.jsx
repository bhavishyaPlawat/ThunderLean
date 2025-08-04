import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

// --- PWA: SERVICE WORKER REGISTRATION ---
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the default mini-infobar from appearing
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  // Notify the app that the PWA is installable
  window.dispatchEvent(new CustomEvent("pwa-installable"));
  console.log("`beforeinstallprompt` event was fired.");
});

// Listen for successful PWA installation
window.addEventListener("appinstalled", (e) => {
  console.log("PWA was installed successfully");
  // Clear the deferredPrompt
  window.deferredPrompt = null;
  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent("pwa-installed"));
});

// Check if app is already installed on page load
window.addEventListener("DOMContentLoaded", () => {
  // Check if running as PWA (standalone mode)
  if (
    window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    console.log("App is running as PWA");
    // App is already installed, don't show install button
    window.dispatchEvent(new CustomEvent("pwa-already-installed"));
  } else if (window.navigator.standalone === true) {
    // For iOS Safari
    console.log("App is running as PWA on iOS");
    window.dispatchEvent(new CustomEvent("pwa-already-installed"));
  }
});

// Handle PWA update available
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);

        // Listen for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker?.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New content is available, show update notification
              console.log("New content is available; please refresh.");
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// --- END OF PWA CODE ---

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
