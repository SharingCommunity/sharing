/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Cache Google fonts:
  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "googleapis",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp(/^(http|https):.*min\.(css|js)$/),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-css-resources"
    })
  );

  // workbox.routing.registerRoute(
  //   // Cache CSS files.
  //   new RegExp(/.css$/),
  //   // Use cache but update in the background.
  //   new workbox.strategies.StaleWhileRevalidate({
  //     // Use a custom cache name.
  //     cacheName: "css-cache"
  //   })
  // );

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache this. This is all we need for precaching

  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );

  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/index.html")
  );

  // workbox.routing.registerRoute(
  //   /^(http|https):.*wegive\.me(?:\\?.+)?$/,
  //   new workbox.strategies.CacheFirst()
  // );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// install new service worker when ok, then reload page.
self.addEventListener("message", msg => {
  if (msg.data.action == "skipWaiting") {
    self.skipWaiting();
  }
});
