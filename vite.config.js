import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Slider from "react-slick";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Agrigram",
  build: {
    outDir: "dist",
  },
  plugins: [react(), Slider],
});
