import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import lenis from "astro-lenis";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // ✅ Questo dice ad Astro di gestire GSAP correttamente come modulo
      noExternal: ["gsap"],
    },
  },
  integrations: [react(), lenis()],
});