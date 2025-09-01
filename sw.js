const CACHE_NAME = 'pwa-winpyae-portfolio-v1';
const OFFLINE_URL = 'offline.html';
const PRECACHE = [
  OFFLINE_URL,
  'images/icons/siteLogoWhite.png',
  'images/icons/siteLogoWhite.png',
  'images/icons/siteLogoWhite.png'
  // add your CSS/JS assets here if they’re small & rarely change
];

// Install: pre-cache essentials
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for pages, cache-first for same-origin assets
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Handle page navigations (HTML)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Same-origin assets: cache-first, then network
  const isSameOrigin = new URL(req.url).origin === self.location.origin;
  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
      )
    );
  }
});
