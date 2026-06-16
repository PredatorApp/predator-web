import type { MetadataRoute } from 'next';

const siteUrl = 'https://predator.app';

const routes = [
  { path: '/', priority: 1 },
  { path: '/privacy', priority: 0.4 },
  { path: '/terms', priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority,
  }));
}
