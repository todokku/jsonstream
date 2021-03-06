importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {

  // Manifest generator.
  workbox.precaching.precacheAndRoute([
  {
    "url": "css/app.ef4daf07.css",
    "revision": "d380653874f126f86a142bc9c9339d5e"
  },
  {
    "url": "favicon.ico",
    "revision": "b32d14b29042bdfec6260b3183098e05"
  },
  {
    "url": "index.html",
    "revision": "4686a8741b49d8e2f7401b3462d197fa"
  },
  {
    "url": "js/app.e40e5b7d.js",
    "revision": "5c5667e18899a1f17a027b7157fc5d13"
  },
  {
    "url": "js/chunk-vendors.4ed3ecb0.js",
    "revision": "e7609af2d8766ee482b945ba43010fa4"
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