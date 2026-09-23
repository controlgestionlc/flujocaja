/* Flujo de Caja Consolidado · service worker: app instalable y funcionamiento offline.
   Sube VERSION cada vez que publiques cambios para forzar la actualización. */
const VERSION = 'fcc-1.4.0';   // debe coincidir con APP_VERSION de index.html
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const CDN = ['cdnjs.cloudflare.com', 'www.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Firestore / Auth: nunca cachear
  if (/googleapis\.com|firebaseio\.com|identitytoolkit|securetoken/.test(url.hostname)) return;
  if (CDN.includes(url.hostname)) {
    // librerías versionadas: cache primero
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return res; })));
    return;
  }
  if (url.origin === location.origin) {
    // app: red primero (para recibir actualizaciones), cache si no hay conexión
    e.respondWith(fetch(req).then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  }
});
