const staticCacheName = "site-static-v1.0.4";
const assets = [
  "./",
  "./index.html",
  "./main.bundle.js",
  "./spa.bundle.js",
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
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
  console.log("service worker has been installed", e);
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

  console.log("service worker has been activated", e);
});

// fetch event
self.addEventListener("fetch", e => {
  console.log("Searching match for", e.request);
  // if (e.request.mode == "no-cors" && e.request.cache != "only-if-cached") {
  //   e.respondWith(
  //     caches.match(e.request).then(cacheResp => {
  //       console.log("cacheResp", cacheResp);
  //       return cacheResp || fetch(e.request);
  //     })
  //   );
  // }
});
