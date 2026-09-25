import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served by nginx at /projects/films_base/ (see wrapper repo nginx/locations.conf)
  base: "/projects/films_base/",
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    // In dev the project runs on its own dev server, without nginx:
    // forward same-origin /api to the local Node server
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
