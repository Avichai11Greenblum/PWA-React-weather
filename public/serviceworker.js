const CACHE_NAME = "version1";
const urlsToCache = [ "index.html", "offline.html" ];

const self = this;

//* Install SW (serviceWorker) 
//? the first time we open the cache this will be activated

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)   //? --> this returns a promise 
            .then( (cache) => {
                console.log("cache opened");

                return cache.addAll(urlsToCache);
            })
    )
});

//* Listen for requests

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then( () => {
                return fetch(event.request) //? A promise, if it fails (no internet) so it will go to .catch
                    .catch( () => caches.match("offline.html")) //? --> in case the promise has failed we will put the offline ver of html
            })
    )
});


//* Activate the SW
//? the update of the cache where we get rid of unwanted cache and save the new one

self.addEventListener("activate", (event) => {
    // We are going to make a list which it's values we want to keep
    const whiteList = [];
    whiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys() //?  --> also returns a promise
            .then( (cacheNames) => Promise.all(  //? --> we take the list of cache keys names loop them with map and filter the unwanted
                cacheNames.map( (cacheName) => {
                    if(!whiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    };
                })
            ))
    )
});