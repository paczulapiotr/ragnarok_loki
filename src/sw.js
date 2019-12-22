const staticCacheName = "site-static-v1.1.4";
const assets = [
  "./",
  "./index.html",
  "./main.bundle.js",
  "./manifest.json",
  "./public/icons/icon_72x72.png",
  "./public/icons/icon_96x96.png",
  "./public/icons/icon_128x128.png",
  "./public/icons/icon_256x256.png",
  "./public/icons/icon_512x512.png"
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
