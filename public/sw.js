// BINA offline service worker (Mode Daerah 3T) — demonstrative.
// Caches the app shell and downloaded materials so students can keep learning
// without a connection. Real activity data is queued in localStorage on the
// client and synced when back online.

const CACHE = 'bina-shell-v1';
const SHELL = ['/', '/offline', '/forum', '/aksesibilitas'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(SHELL).catch(() => {})),
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
        ),
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    // Network-first for navigations, falling back to cache when offline.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE).then((cache) => cache.put(request, copy));
                    return res;
                })
                .catch(() => caches.match(request).then((r) => r || caches.match('/offline'))),
        );
        return;
    }

    // Cache-first for static assets.
    if (request.url.includes('/build/') || request.destination === 'image') {
        event.respondWith(
            caches.match(request).then((cached) => cached || fetch(request).then((res) => {
                const copy = res.clone();
                caches.open(CACHE).then((cache) => cache.put(request, copy));
                return res;
            }).catch(() => cached)),
        );
    }
});
