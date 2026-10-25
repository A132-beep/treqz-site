// Treqz offline maps. "Download offline map" on a trek page stores every file that page loaded in a per-trek cache
// (see engine.js). Here, a saved file is answered from that cache at once, so the 3D map opens with no signal,
// and is refreshed quietly in the background when there is a connection. Anything not saved goes to the network as usual.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const opts = { ignoreSearch: true, ignoreVary: true };
    for (const name of await caches.keys()) {
      const cache = await caches.open(name), hit = await cache.match(e.request, opts);
      if (!hit) continue;
      e.waitUntil(fetch(e.request).then((r) => r.ok && cache.put(e.request, r)).catch(() => {}));   // offline: keep what we have
      return hit;
    }
    return fetch(e.request);
  })());
});
