const staticCacheName = "site-static-v1.2.0";
const assets = [
  "/",
  "/index.html",
  "/main.bundle.js",
  "/manifest.json",
  "/public/icons/icon_72x72.png",
  "/public/icons/icon_96x96.png",
  "/public/icons/icon_128x128.png",
  "/public/icons/icon_256x256.png",
  "/public/icons/icon_512x512.png",
  "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2"
];

// install service worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// activate service worker
self.addEventListener("activate", e => {
  e.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== staticCacheName)
            .map(key => caches.delete(key))
        )
      )
  );
});

// fetch event
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cacheResp => {
      return cacheResp || fetch(e.request);
    })
  );
});
