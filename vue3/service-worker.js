/* eslint-disable no-undef */
// 设置缓存名称前缀
workbox.core.setCacheNameDetails({ prefix: 'wd-template' });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
})

self.addEventListener('activate', function (event) {
  console.debug(event)
  // event.waitUntil(
    // caches.keys().then((keys) => (
    //   Promise.all(
    //     keys.filter((key) => key !== cacheKey).map((key) => caches.delete(key))
    //   )
    // )).then(() => {
      // self.clients.claim()
  //   })
  // )
})

self.addEventListener('fetch', function (event) {
  console.debug(event)
  // console.log('请求触发')

  // if (CACHE_LIST.find((cache) => {
  //   return event.request.url.endsWith(cache)
  // })) {
  //   event.respondWith(
  //     caches.match((event.request)).then((cachedResponse) => (
  //       cachedResponse || fetch(event.request)
  //     ))
  //   )
  // }
})

let isSave = true
function saveDocument () {
  return new Promise((res, rej) => {
    isSave = !isSave
    if (isSave) {
      console.log('saveDocument')
      res(true)
    } else {
      rej(false)
    }
  })
}
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-save-document') {
    event.waitUntil(saveDocument());
  }
})

self.addEventListener('push', function(e) {
  console.log('push', e)
})

self.addEventListener('notification', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
})

// 要 precache 预先缓存的文件
self.__precacheManifest = [
  // {
  //     url: 'index.html',
  //     revision: 'dbd40fec5ea49691d7c6c775192f66f5'
  // },
].concat(self.__precacheManifest || []);

// precacheAndRoute 预缓存静态文件
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/*
    registerRoute 路由请求缓存
    第一个参数可以是正则、完整路径字符串、或者是返回布尔值的函数
    第二个参数 workbox.strategies.networkFirst() 是一个路由缓存策略，用来确定资源缓存方式
      staleWhileRevalidate 请求的路由有对应的 cache 缓存就直接返回，同时在后台再次发起请求并更新 Cache
      networkFirst 请求后，首先尝试拿到网路请求的返回结果，请求到就直接返回并且更新 cache，否则返回缓存中的内容
      cacheFirst 请求后，直接从 Cache 中取得结果，没有的话在发起网络请求
      networkOnly 强制使用网络请求
      cacheOnly 强制使用 Cache 资源
 */

// workbox.routing.registerRoute(
//     new RegExp('.*.js'),
//     workbox.strategies.networkFirst()
// );
