const CACHE='elektronik-diag-v8-3-symbole-obliczenia';
const ASSETS=['./','./index.html','./pc_diagnostics_tools.js','./electronic_components_module.js','./board_sectors_module.js','./formula_symbols_module.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./components.json','./device_categories.json','./elektronik_diag_db_v1.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));
 }else if(e.request.method==='GET'){
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{const copy=net.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return net})));
 }
});
