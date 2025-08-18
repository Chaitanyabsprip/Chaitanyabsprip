// @ts-check
import { defineConfig } from "astro/config";
// import purgecss from "astro-purgecss";

import tailwindcss from "@tailwindcss/vite";

import playformCompress from "@playform/compress";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://chaitanyas.dev",
  markdown: {
    shikiConfig: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-ocean",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // purgecss({
    //   extractors: [
    //     {
    //       extractor: (content) =>
    //         content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    //       extensions: ["astro", "html"],
    //     },
    //   ],
    // }),
    playformCompress(),
    robotsTxt(),
  ],
});
