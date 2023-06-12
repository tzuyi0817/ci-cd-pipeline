// pnpm install --save-dev sw-precache or workbox

const filesToCache = [
	'/',
];
const cacheName = 'static-v1';
const dataCacheName = 'static-v1-data';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
	);
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const promiseArr = cacheNames.map(item => {
        if (item !== cacheName) {
          return caches.delete(item);
        }
      })
      return Promise.all(promiseArr);
    })
  );
});

self.addEventListener('fetch', event => {
  const cached = caches.match(event.request);
  const fetched = fetch(event.request);
  const fetchedCopy = fetched.then(resp => resp.clone());

  event.respondWith(
    Promise.race([fetched.catch(_ => cached), cached])
      .then(response => response || fetched)
      .catch(_ => new Response(null, { status: 404 }))
  );

  // 用 fetch 回來的資料更新快取
  event.waitUntil(
    Promise.all([fetchedCopy, caches.open(dataCacheName)])
      .then(([response, cache]) => cache.put(event.request, response))
      .catch(_ => {/* errors */})
  );
});
