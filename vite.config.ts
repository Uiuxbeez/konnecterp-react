import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";
  import { fileURLToPath } from "url";

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const API_PORT = process.env.API_PORT ?? 5001;
  const API_TARGET = `http://127.0.0.1:${API_PORT}`;

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
      dedupe: ["react", "react-dom"],
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      port: 5000,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      open: false,
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
        },
        "/uploads": {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
      host: "0.0.0.0",
    },
  });
