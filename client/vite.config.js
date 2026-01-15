import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // important for containers (binds to 0.0.0.0)
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3030",
        changeOrigin: true,
        secure: false,
        ws: true,
        // keep /api prefix OR strip it depending on your backend routes
        // If backend expects routes WITHOUT /api, keep rewrite:
        rewrite: (path) => path.replace(/^\/api/, ""),
        // If backend expects /api routes, REMOVE rewrite line
      },
    },
  },
});