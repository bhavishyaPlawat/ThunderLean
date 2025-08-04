import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Explicitly include assets in the public directory to be cached
      includeAssets: [
        "assets/favicon.png",
        "assets/icon1.png",
        "assets/icon2.png",
      ],
      manifest: {
        name: "ThunderLean",
        short_name: "ThunderLean",
        description: "Your intelligent partner for a healthier lifestyle.",
        theme_color: "#8C4DCF",
        background_color: "#E3E7F0",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "assets/icon1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/icon2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // This ensures all built assets (JS, CSS, etc.) are pre-cached
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        // This is the new, crucial part.
        // It sets up a caching strategy for navigation requests (loading pages).
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
            },
          },
        ],
      },
    }),
  ],
});
