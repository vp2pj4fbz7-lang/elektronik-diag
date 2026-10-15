const CACHE='elektronik-diag-v8-6-atorch-module';
const ASSETS=['./','./index.html','./pc_diagnostics_tools.js','./electronic_components_module.js','./board_sectors_module.js','./formula_symbols_module.js','./advanced_schematics_module.js','./atorch_module.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./components.json','./device_categories.json','./elektronik_diag_db_v1.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET') return;
 const url=new URL(req.url);
 const isLocalPdf=url.origin===self.location.origin && url.pathname.includes('/biblioteka/') && url.pathname.toLowerCase().endsWith('.pdf');
 if(isLocalPdf){
   // Cache PDF on first successful online open; later requests can be served offline.
   e.respondWith(caches.open(CACHE).then(async cache=>{
     const cached=await cache.match(req);
     if(cached) return cached;
     try {
       const response=await fetch(req);
       if(response.ok) await cache.put(req,response.clone());
       return response;
     } catch(err) {
       return new Response('Ten PDF nie został jeszcze zapisany do pamięci offline. Połącz się z Internetem i otwórz dokument przynajmniej raz.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
     }
   }));
 }else if(req.mode==='navigate'){
   e.respondWith(fetch(req,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));
 }else{
   e.respondWith(caches.match(req).then(r=>r||fetch(req).then(net=>{if(net.ok){const copy=net.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return net})));
 }
});
