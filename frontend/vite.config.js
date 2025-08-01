import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Caches all important assets
      },
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
            src: "assets/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
