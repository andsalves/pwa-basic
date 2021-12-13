/**
 * A serviceWorker file is entirely event-driven.
 * This means that it won’t run any code unless it’s responding to an event.
 *
 */

// Any change in this file will trigger a new install event.
self.addEventListener('install', async event => {
  console.log('install event', event);
  await cacheAssets();
});

self.addEventListener('fetch', async event => {
  console.log('fetch event', event);
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

const cacheKey = 'test-pwa';
const staticAssets = [
  // Cacheable assets list. All the paths should be valid.
  './',
  './index.html',
  './app.js',
  './styles.css',
];

async function cacheAssets() {
  try {
    const cache = await caches.open(cacheKey);
    await cache.addAll(staticAssets);
  } catch (error) {
    console.warn('Error while caching assets: ', error);
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(cacheKey);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}
