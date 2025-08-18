// @ts-check
import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";

import tailwindcss from "@tailwindcss/vite";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://chaitanyas.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    purgecss({
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["astro", "html"],
        },
      ],
    }),
    playformCompress(),
  ],
});
