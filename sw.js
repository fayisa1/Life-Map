const V='lifemap-v38';
const CORE=['./','./index.html'];
const EXTRA=['./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-192.png','./icon-maskable-512.png','./adhans.json','./sounds.json','./quotes.json','./hisn.json','./hadith.json','./scholars.json','./hadith/books.json','./tawheed/index.json','./sunnah.json','./forty_quotes.json','./names.json','./mushaf/index.json','./reciters.json'];
const OPTIONAL=['./adhan.mp3','./adhan-fajr.mp3','./adhan.m4a','./adhan-fajr.m4a','./adhan.ogg','./adhan-fajr.ogg','./adhan.wav','./adhan-fajr.wav'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(V);
  await c.addAll(CORE);
  // everything else is cached if present; a missing file never blocks the install
  await Promise.all(EXTRA.map(u=>c.add(u).catch(()=>{})));
  // built-in adhan list: cache every file named in adhans.json so they play offline
  try{const j=await (await fetch('./sounds.json',{cache:'no-cache'})).json();await Promise.all(j.map(x=>c.add('./'+x.file).catch(()=>{})));}catch(e){}
  try{const j=await (await fetch('./adhans.json',{cache:'no-cache'})).json();await Promise.all(j.map(x=>c.add('./'+x.file).catch(()=>{})));}catch(e){}
  // adhan files are optional: cache the ones that exist, ignore the rest
  await Promise.all(OPTIONAL.map(u=>fetch(u).then(r=>{if(r.ok&&r.status===200)return c.put(u,r);}).catch(()=>{})));
  await self.skipWaiting();})());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='lifemap-audio').map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
async function rng(req,res){
  const m=/bytes=(\d*)-(\d*)/.exec(req.headers.get('range')||'');if(!m)return res;
  const b=await res.clone().arrayBuffer(),n=b.byteLength;
  let s,e;if(m[1]===''){s=Math.max(0,n-parseInt(m[2],10));e=n-1;}else{s=parseInt(m[1],10);e=m[2]===''?n-1:Math.min(parseInt(m[2],10),n-1);}
  if(isNaN(s)||s>=n||e<s)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+n}});
  return new Response(b.slice(s,e+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':'bytes '+s+'-'+e+'/'+n,'Content-Length':String(e-s+1),'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  e.respondWith((async()=>{
    const hit=await caches.match(r,{ignoreSearch:true});
    if(hit&&r.headers.has('range'))return rng(r,hit);
    const net=fetch(r).then(res=>{if(res&&res.status===200){const copy=res.clone();caches.open(V).then(c=>c.put(r,copy)).catch(()=>{});}return res;}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit;}
    const res=await net;
    if(res)return res;
    return r.mode==='navigate'?(await caches.match('./index.html'))||Response.error():Response.error();
  })());});
self.addEventListener('notificationclick',e=>{
  const n=e.notification,d=n.data||{};n.close();
  e.waitUntil((async()=>{
    const list=await clients.matchAll({type:'window',includeUncontrolled:true});
    if(e.action==='prayed'&&d.id){
      if(list.length){list[0].postMessage({type:'prayed',id:d.id,s:d.s});return list[0].focus();}
      return clients.openWindow('./index.html?prayed='+encodeURIComponent(d.id)+(d.s?'&s='+encodeURIComponent(d.s):''));
    }
    if(list.length)return list[0].focus();
    return clients.openWindow('./index.html');
  })());});
