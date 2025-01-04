self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-cache').then(cache => {
            return cache.addAll([
                '/',
                '../index.html',
                '../about.html',
                '../project.html', 
                '../styles/modern-normalize.css', 
                '../styles/style.css', 
                '../styles/utils.css', 
                '../styles/components/header.css', 
                '../styles/components/hero.css', 
                '../styles/components/project.css', 
                '../styles/components/about.css',
                '../styles/components/mobile-nav.css',
                '../src/main.js',  // Cache main .js file
                '../mobile-nav.js',
                '../redirect.js',


            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});