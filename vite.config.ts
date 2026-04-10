import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BACKEND = process.env.VITE_FRAPPE_BASE_URL || "https://crm.galaxylabs.online";
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || (isProd ? "/assets/galaxy_ui/react_dashboard/" : "/"),
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND,
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: "localhost",
      },
    },
  },
});
