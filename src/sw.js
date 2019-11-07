// install service worker
self.addEventListener("install", e => {
  console.log("service worker has been installed", e);
});

// activate service worker
self.addEventListener("activate", e => {
  console.log("service worker has been activated", e);
});
