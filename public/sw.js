// Copyright © 2026 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const CACHE_NAME = "";
const CACHE_FILES = [];

self.addEventListener("install", async (e) => {
    console.log("SW: install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_FILES);
        })(),
    );
});

self.addEventListener("activate", async (e) => {
    console.log("SW: activate");
    e.waitUntil(
        (async () => {
            for (const key of await caches.keys()) {
                if (key === CACHE_NAME) {
                    continue;
                }

                await caches.delete(key);
            }
        })(),
    );
});

self.addEventListener("fetch", async (e) => {
    console.log("SW: fetch");
    e.respondWith(
        (async () => {
            const cached = await caches.match(e.request);
            console.log("SW: fetch:", cached);
            if (cached) {
                return cached;
            }

            const fetched = await fetch(e.request);
            const cache = await caches.open(CACHE_NAME);
            await cache.put(e.request, fetched.clone());
            return fetched;
        })(),
    );
});
