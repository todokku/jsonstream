importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {

  // Manifest generator.
  workbox.precaching.precacheAndRoute([
  {
    "url": "css/app.575211cb.css",
    "revision": "c5e81780fc65000583f676073c502198"
  },
  {
    "url": "favicon.ico",
    "revision": "d551a294235e7c933d5e2d5c000018a5"
  },
  {
    "url": "index.html",
    "revision": "17cf086553bfdfc53b884d51c1ade02b"
  },
  {
    "url": "js/app.4e1af2a3.js",
    "revision": "710ed199f55d7d97e5174eb0ed6d29d7"
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