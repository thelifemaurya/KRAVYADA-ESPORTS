/* KRAVYADA ESPORTS service worker.
   - Pages: network first, so visitors always get the newest version; falls back to the cache, then /offline.
   - /_next/static files: cache first (their names change whenever the content changes).
   - Images and fonts: serve from cache, refresh in the background.
   Bump VERSION to clear old caches. */
const VERSION = 'v2'
const PAGES = 'kv-pages-' + VERSION
const ASSETS = 'kv-assets-' + VERSION
const PRECACHE = ['/', '/scrims', '/about', '/trials', '/offline', '/kravyada-logo.jpg', '/icons/icon-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => undefined))))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

async function networkFirst(request) {
  const cache = await caches.open(PAGES)
  try {
    const response = await fetch(request)
    if (response && response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || (await cache.match('/offline')) || Response.error()
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSETS)
  const hit = await cache.match(request)
  if (hit) return hit
  const response = await fetch(request)
  if (response && response.ok) cache.put(request, response.clone())
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS)
  const hit = await cache.match(request)
  const refresh = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => undefined)
  return hit || (await refresh) || Response.error()
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request))
    return
  }
  if (
    url.pathname.startsWith('/_next/image') ||
    url.pathname.startsWith('/icons/') ||
    /\.(?:png|jpe?g|webp|svg|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request))
  }
})
