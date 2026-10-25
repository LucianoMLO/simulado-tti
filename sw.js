/* Service worker: o app funciona offline depois do primeiro acesso.
   Estratégia: abre rápido pelo cache e atualiza em segundo plano (stale-while-revalidate). Troque VERSAO ao publicar mudanças grandes. */
const VERSAO='tti-v2';
const ARQUIVOS=[
 './','index.html','app.css','app.js','manifest.webmanifest','icon-192.png','icon-512.png',
 'banco/00_temas.js','banco/00_piloto.js','banco/01_mercado.js','banco/02_tecnico_construcao.js','banco/03_tecnico_direito.js',
 'banco/04_tecnico_documentacao.js','banco/05_pessoas_marketing.js','banco/06_pessoas_psicologia.js','banco/07_numeros.js',
 'banco/08_estagio.js','banco/09_avi_intro.js','banco/10_avi_metodos.js','banco/10b_avi_ptam_judicial.js','banco/10c_avi_pratica.js',
 'banco/11_desafio_mercado.js','banco/12_desafio_tecnico.js','banco/13_desafio_pessoas.js','banco/14_desafio_numeros.js','banco/15_desafio_avi.js'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(VERSAO).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:true});
    const rede=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>hit);
    return hit||rede;
  }));
});
