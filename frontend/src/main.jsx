import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

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
// --- END OF PWA CODE ---

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
