import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/crew-desk-hr-frontend/",
  plugins: [react(), tailwindcss()],
});