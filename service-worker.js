const CACHE_NAME = 'energia-quantica-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Inclua aqui outros arquivos importantes do seu site, como CSS, JS, imagens etc.
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            console.log('Deletando cache antigo:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta as requisições e tenta buscar no cache primeiro
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
