// const CACHE_NAME = 'videogame';
// var filesToCache = [
//     'index.html',
//     '/public/images/icon-192.png',
//     '/public/images/icon-256.png',
//     '/public/images/icon-512.png',
//     'http://labs.phaser.io/assets/skies/space3.png',
//     'http://labs.phaser.io/assets/sprites/phaser3-logo.png',
//     'http://labs.phaser.io/assets/sprites/phaser.png',
//     'http://labs.phaser.io/assets/particles/red.png',
//     '/lib/phaser.min.js',
//     '/lib/normalize.css',
//     '/src/scenes/levels-dashboard.js',
//     '/src/scenes/menu.js',
//     '/src/game.mjs',
//     'manifest.json',
// ];

/** event to install app */
// self.addEventListener("install", installEvent => {
//     installEvent.waitUntil(
//         caches.open(CACHE_NAME).then(cache => {
//             cache.addAll(filesToCache);
//         })
//     );
// });

/** event to caching files */
// self.addEventListener('fetch', e => {
//     e.respondWith(
//         caches.match(e.request).then(r => {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             return r || fetch(e.request).then(async response => {
//                 const cache = await caches.open(CACHE_NAME);
//                 console.log('[Service Worker] Caching new resource: ' + e.request.url);
//                 cache.put(e.request, response.clone());
//                 return response;
//             });
//         })
//     );
// });

/** event to activate sw */
// self.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(keyList.map(key => {
//                 if (key !== CACHE_NAME) {
//                     console.log('[ServiceWorker] Removing old cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
// });

/** event to register sw */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('sw.js', { scope: '/' })
//             .then(registration => {
//                 console.log(
//                     '[ServiceWorker] Registration successful with scope: ',
//                     registration.scope
//                 );
//             }, err => {
//                 console.log('[ServiceWorker] Registration failed: ', err);
//             }
//             );
//     });
// }