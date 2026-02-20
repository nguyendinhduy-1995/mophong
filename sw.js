const CACHE_NAME = 'mophong-v8';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/ai.js',
  '/manifest.json',
  '/public/icons/icon-192.png',
  '/public/icons/icon-512.png'
];

// Cache tip images
for (let i = 1; i <= 120; i++) {
  ASSETS_TO_CACHE.push(`/public/images/tips/${i}.jpg`);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
