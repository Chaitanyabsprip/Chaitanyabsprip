import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
