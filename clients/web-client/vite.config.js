import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/auth': 'http://localhost:8003',
      '/pets': 'http://localhost:8003',
      '/appointments': 'http://localhost:8003',
      '/rewards': 'http://localhost:8003',
      '/postconsult': 'http://localhost:8003'
    }
  }
});
