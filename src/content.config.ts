import { defineCollection } from "astro:content";

import { glob, file } from 'astro/loaders';

import { z } from 'astro/zod';

const artworks = defineCollection({
  loader: glob({ base: './src/content/artworks', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    medium: z.string(),
    image: z.string(),
    slug: z.string(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  artworks,
};
