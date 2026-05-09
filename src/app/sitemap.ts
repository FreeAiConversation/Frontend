import { MetadataRoute } from 'next';
import { tools, categories } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';
  const currentDate = new Date();

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category pages
  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}${category.href}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Tool pages
  tools.forEach((tool) => {
    routes.push({
      url: `${baseUrl}${tool.href}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Static pages (add more as needed)
  const staticPages = ['/privacy', '/terms', '/contact'];
  staticPages.forEach((page) => {
    routes.push({
      url: `${baseUrl}${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  return routes;
}
