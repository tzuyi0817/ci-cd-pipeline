// pnpm install --save-dev sw-precache

const filesToCache = [
	'/',
  // '/styles/globals.css',
  // '/styles/Home.module.css',
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
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request).then(res =>
				caches.open(dataCacheName).then(cache => {
          // cache.put(key, value)
          // 下一次 caches.match 會對應到 event.request
          cache.put(event.request, res.clone());
          return res;
				})
			);
		})
	);
});
