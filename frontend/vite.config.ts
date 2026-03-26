import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const rawBase = process.env.VITE_BASE_PATH || "/";
  const prefixedBase = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
  const normalizedBase = prefixedBase.endsWith("/")
    ? prefixedBase
    : `${prefixedBase}/`;

  return {
    base: normalizedBase,
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
  };
});
