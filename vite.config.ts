import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    allowedHosts: [
      'universidad-frontend.onrender.com',
      'localhost:8081',
      '192.168.0.2:8081',
      '25.5.74.72:8081'
    ]
  }
});
