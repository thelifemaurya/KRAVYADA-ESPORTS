import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION } from './site'

// Served at /manifest.webmanifest. This is what lets Chrome offer "Install app".
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'KRAVYADA ESPORTS',
    short_name: 'KRAVYADA',
    description: SITE_DESCRIPTION,
    lang: 'en-IN',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#08080a',
    theme_color: '#08080a',
    categories: ['games', 'sports'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Scrims', url: '/scrims', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Apply to play', url: '/join', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  }
}
