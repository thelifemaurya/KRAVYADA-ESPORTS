import type { MetadataRoute } from 'next'
import { SITE_URL } from './site'

// Served at /sitemap.xml. Single-page site: only the homepage is listed.
// Add new routes here as pages are created.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
