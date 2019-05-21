importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
    "/precache-manifest.cec4a4b2c9c5ee2bced799ec5d420df3.js"
);
  
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
});
  
workbox.core.clientsClaim();
  
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
  
workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
    
    blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});
  
workbox.routing.registerRoute(
    /.*\/graphql/,
    workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
    'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
    workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
    /https\:\/\/newsapi\.org\/.*/,
    workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.networkFirst(),
)

workbox.routing.registerRoute(
    'http://localhost:3100',
    workbox.strategies.networkFirst()
)

const bgSyncPlugin = new workbox.backgroundSync.Plugin('graphqlQueue', {
    maxRetentionTime: 24 * 60
});
  
workbox.routing.registerRoute(
    /.*\/graphql/,
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
)