import type { MetadataRoute } from 'next'
import { SITE_URL } from './site'

// Served at /sitemap.xml. Add new routes here as pages are created.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/scrims`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/trials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
