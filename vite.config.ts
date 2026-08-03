import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";
  import { fileURLToPath } from "url";

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      host: "0.0.0.0",
      allowedHosts: true,
      open: false,
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.API_PORT ?? 5001}`,
          changeOrigin: true,
        },
        "/uploads": {
          target: `http://localhost:${process.env.API_PORT ?? 5001}`,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 4173,
      host: "0.0.0.0",
    },
  });
  