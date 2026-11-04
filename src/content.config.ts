import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.string(),
    role: z.string(),
    summary: z.string(),
    featured: z.boolean().default(true),
    order: z.number(),
    techStack: z.array(z.string()),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    metrics: z.string().optional(),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects };

