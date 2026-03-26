import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    host: "0.0.0.0",
    port: 10005,
    proxy: {
      "/api": {
        target: "http://localhost:10006",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost",
      },
    },
  },
}));
