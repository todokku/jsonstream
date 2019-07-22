importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {

  // Manifest generator.
  workbox.precaching.precacheAndRoute([
  {
    "url": "css/app.a71b3bce.css",
    "revision": "8132a6dddd1c6fee056731fc2272bca4"
  },
  {
    "url": "favicon.ico",
    "revision": "b32d14b29042bdfec6260b3183098e05"
  },
  {
    "url": "index.html",
    "revision": "441237845a22ee6ab8ea12d4ced73ad9"
  },
  {
    "url": "js/app.b71fcc18.js",
    "revision": "f7dbd2c0f158c3e64e5ca5bac8f4f9ba"
  },
  {
    "url": "js/chunk-vendors.8a1b2796.js",
    "revision": "1c02b0241b34f8f474468a01159fd24a"
  }
]);

  // Cache JS and CSS files.
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  // Cache local fonts.
  workbox.routing.registerRoute(
    /\.ttf$/,
    new workbox.strategies.CacheFirst()
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}