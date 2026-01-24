// Copyright © 2026 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const CACHE_NAME = "";
const CACHE_FILES = [];

self.addEventListener("install", async (e) => {
    console.log("SW: install");
    e.waitUntil(async () => {
        const cache = await caches.open(CACHE_NAME);
        caches.addAll(CACHE_FILES);
    });
});

self.addEventListener("fetch", async (e) => {
    console.log("SW: install");
    e.respondWith(async () => {
        const cacheResponse = await caches.match(e.request);
        console.log("SW: cacheResponse:", cacheResponse);
        if (cacheResponse) {
            return cacheResponse;
        }

        const fetchResponse = await fetch(e.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(e.request, fetchResponse.clone());
        console.log("SW: fetchResponse:", fetchResponse);

        return fetchResponse;
    });
});
