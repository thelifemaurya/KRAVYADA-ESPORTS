/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // The browser must always re-check the service worker file for updates.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ]
  },
}

export default nextConfig
