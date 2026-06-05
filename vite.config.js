import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: { maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 },
      includeAssets: ["favicon.ico", "icon.svg", "apple-touch-icon-180x180.png"],
      manifest: {
        name: "Professor's Quarters",
        short_name: "Prof Sim",
        description: "A weight management simulation",
        theme_color: "#070510",
        background_color: "#070510",
        display: "standalone",
        icons: [
          { src: "pwa-64x64.png",          sizes: "64x64",   type: "image/png" },
          { src: "pwa-192x192.png",         sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png",         sizes: "512x512", type: "image/png" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
});
