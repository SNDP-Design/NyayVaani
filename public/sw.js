const STATIC_CACHE = 'nyayvaani-static-v3';
const NAVIGATION_CACHE = 'nyayvaani-navigation-v3';
const CURRENT_CACHES = new Set([STATIC_CACHE, NAVIGATION_CACHE]);
const STATIC_ASSETS = ['/manifest.json', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const legacyCacheNames = cacheNames.filter(
        (name) => !CURRENT_CACHES.has(name),
      );

      await Promise.all(legacyCacheNames.map((name) => caches.delete(name)));
      await self.clients.claim();

      if (legacyCacheNames.length > 0) {
        const windows = await self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });
        windows.forEach((client) => {
          void client.navigate(client.url).catch(() => undefined);
        });
      }
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (
    request.method !== 'GET' ||
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.startsWith('/api/')
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request, { cache: 'no-store' });
          if (response.ok) {
            const cache = await caches.open(NAVIGATION_CACHE);
            await cache.put('/index.html', response.clone());
          }
          return response;
        } catch {
          const cachedPage = await caches.match('/index.html');
          if (cachedPage) return cachedPage;

          return new Response(
            '<!doctype html><html><body><main><h1>NyayVaani is offline</h1><p>Please reconnect to the internet and try again.</p></main></body></html>',
            {
              status: 503,
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            },
          );
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;

      const response = await fetch(request);
      if (response.ok && !response.redirected) {
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    })(),
  );
});
