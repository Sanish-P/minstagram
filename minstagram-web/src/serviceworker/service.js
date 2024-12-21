import { handleSameOriginRequests, handleCrossOriginRequests } from './fetchHandler';

const PRECACHE = 'precache-v1';
const CORS = 'cors-cache-v1';

const PRECACHE_URLS = [
  'index.html',
  'main.js'
]

/*
  waitUntil takes promise as argument
*/

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      console.log('install....')
      const cache = await caches.open(PRECACHE); // opens cache named PRECACHE
      await cache.addAll(PRECACHE_URLS); // adds index and main.js to cache
      return await self.skipWaiting();
    } catch (error) {
      console.error(error)
    }
  })())
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, CORS]; // app cache array
  event.waitUntil((async () => {
    try {
      console.log('activate....')
      const cacheNames = await caches.keys()
      const cachesToDelete = cacheNames.filter(cacheNames => !currentCaches.includes(cacheNames));
      await Promise.all(cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)))
    } catch (error) {
      console.error(error)
    }
  })())
});

/*
  respondWith takes promise as argument
*/
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) { // checks for same origin i.e http://localhost:8000 in this case
    event.respondWith(handleSameOriginRequests(event, PRECACHE))
  }
  else {
    if (event.request.method === 'GET') {
      event.respondWith(handleCrossOriginRequests(event, CORS))
    }
  }
});