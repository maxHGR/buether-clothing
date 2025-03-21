const CACHE_NAME = "buether-clothing-cache-v1";
const ASSETS_TO_CACHE = [
  "/", // Root page
  "/favicon.ico",
  "/manifest.json",
  "/globals.css",
  "/app/(routes)/authentication",
  "/app/(routes)/checkout",
  "/app/(routes)/payment",
  "/app/(routes)/shop",
  // Add other assets like images, fonts, or additional pages here
];

// Install event - cache essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate the service worker immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all open clients
});

// Fetch event - serve cached assets when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});