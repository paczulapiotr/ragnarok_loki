const staticCacheName = "site-static-v1.2.1";
const assets = [
  "/",
  "/index.html",
  "/main.bundle.js",
  "/manifest.json",
  "/public/icons/icon_72x72.png",
  "/public/icons/icon_96x96.png",
  "/public/icons/icon_128x128.png",
  "/public/icons/icon_256x256.png",
  "/public/icons/icon_512x512.png"
];
const externalAssets = [
  "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2"
];

const assetsWithOrigin = assets.map(asset => self.origin + asset);
const cachedAssets = [...assetsWithOrigin, ...externalAssets];

// install service worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(cachedAssets);
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
  if (cachedAssets.some(adress => e.request.url.includes(adress))) {
    e.respondWith(
      caches.match(e.request).then(cacheResp => {
        return cacheResp || fetch(e.request);
      })
    );
  }
});
