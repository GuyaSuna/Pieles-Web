const CACHE = 'pieles-static-v3';
const CORE = ['./', './index.html', './styles.css', './content.js', './app.js', './assets/favicon.svg', './assets/escuela.jpg'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k.startsWith('pieles-static-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => {
  if(event.request.headers.has('range')||new URL(event.request.url).pathname.endsWith('.mp4'))return;
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(fetch(event.request).then(response => { if(response.ok){ const copy=response.clone(); event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy))); } return response; }).catch(()=>caches.match(event.request).then(cached=>cached || (event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
