importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
  
workbox.routing.registerRoute(
    /.*\/(?:graphql|malware|vulnerabilities|cyber_threat|cloud_security|software_exploits|search|index\.html)/,
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

// workbox.routing.registerRoute(
//     'https://malnews123.herokuapp.com',
//     workbox.strategies.networkFirst()
// )

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