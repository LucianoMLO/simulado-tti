/* Simulado TTI IBREP — app (PWA). Dados: BANCO (banco/*.js), TEMAS, DIAS, ALIAS, TEMA_DESAFIO (banco/00_temas.js). */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=["A","B","C","D"];
const KEY='ttiProgressoV1';
const MIN=70;                                  // meta de aprovação (%)

/* ---------- progresso (localStorage, tolerante a falhas) ---------- */
let P={r:{},chk:{}};
try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');P={r:s.r||{},chk:s.chk||{}}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};

/* ---------- dados: tema, páginas e dia de cada questão ---------- */
const TI=Object.fromEntries(TEMAS.map((t,i)=>[t.nome,i]));
const byId=(a,b)=>a.id.localeCompare(b.id,'pt',{numeric:true});
const byOrd=(a,b)=>(TI[a.tema]-TI[b.tema])||byId(a,b);
function paginas(q){
  const m=q.f.match(/\(p\.\s*([^)]*)\)/);if(!m)return null;
  const nums=(m[1].split(';')[0].match(/\d+/g)||[]).map(Number);
  return nums.length?[Math.min(...nums),Math.max(...nums)]:null;
}
BANCO.forEach(q=>{
  q.n=q.n||1;
  q.tema=(q.n===2&&TEMA_DESAFIO[q.id])||ALIAS[q.d]||q.d;
  q.pg=paginas(q);
});
const orfas=BANCO.filter(q=>!(q.tema in TI));
if(orfas.length)console.warn('Questões sem capítulo:',orfas.map(q=>q.id));
const QS=BANCO.filter(q=>q.tema in TI);
const QID=Object.fromEntries(QS.map(q=>[q.id,q]));
const carga=[0,0,0];                           // questões já alocadas em cada dia básico (equilibra os dias)
TEMAS.forEach(t=>{
  const pad=QS.filter(q=>q.n===1&&q.tema===t.nome).sort(byId);
  if(t.ap==='AVI'){pad.forEach(q=>{q.dia=4});return}
  const base=Math.floor(pad.length/3),r=pad.length%3;
  const extra=[0,1,2].sort((a,b)=>carga[a]-carga[b]||a-b).slice(0,r);      // os dias mais leves recebem a sobra
  const tam=[0,1,2].map(d=>base+(extra.includes(d)?1:0));
  let i=0;tam.forEach((n,d)=>{for(let k=0;k<n;k++,i++)pad[i].dia=d+1;carga[d]+=n});
});
QS.filter(q=>q.n===2).forEach(q=>{q.dia=5});
const DQ={};DIAS.forEach(d=>{DQ[d.n]=QS.filter(q=>q.dia===d.n).sort(byOrd)});

/* ---------- estatísticas ---------- */
function stat(list){
  let resp=0,ok=0,hint=0;
  list.forEach(q=>{const a=P.r[q.id];if(a){resp++;if(a.ok)ok++;if(a.dica)hint++}});
  return {tot:list.length,resp,ok,hint,pct:resp?Math.round(ok/resp*100):null,done:resp===list.length&&list.length>0};
}
const cor=p=>p===null?'':p>=MIN?'g':p>=50?'a':'r';
const txt=p=>p===null?'—':p>=MIN?'🟢 Acima da meta':p>=50?'🟡 Próximo da meta':'🔴 Abaixo da meta';
const fmt=p=>p===null?'—':p+'%';
function bar(list){const s=stat(list);return `<div class="bar ${cor(s.pct)==='a'?'a':cor(s.pct)==='r'?'r':''}"><i style="width:${s.tot?Math.round(s.resp/s.tot*100):0}%"></i></div>`}
function faixa(list){
  const pg=list.map(q=>q.pg).filter(Boolean);if(!pg.length)return null;
  return [Math.min(...pg.map(p=>p[0])),Math.max(...pg.map(p=>p[1]))];
}
const rotPg=(r,ap)=>r?(r[0]===r[1]?`p. ${r[0]}`:`p. ${r[0]}–${r[1]}`)+` (${ap})`:'—';
const temaDe=n=>TEMAS[TI[n]];

/* ---------- dia atual ---------- */
function diaHoje(){
  const w=new Date().getDay();
  if(w>=1&&w<=5)return w;
  const f=DIAS.find(d=>!stat(DQ[d.n]).done);return f?f.n:1;
}

/* ---------- navegação ---------- */
const V=$('#view');
let cur={v:'hoje',a:null},R=null;
function go(v,a,push){
  cur={v,a};
  const h='#'+v+(a!==undefined&&a!==null?'/'+a:'');
  if(push!==false&&location.hash!==h){try{history.pushState(null,'',h)}catch(e){location.hash=h}}
  render();window.scrollTo(0,0);
}
function parseHash(){
  const m=location.hash.replace('#','').split('/');
  const v=m[0]||'hoje';const a=m[1]||null;
  return {v,a};
}
window.addEventListener('popstate',()=>{const h=parseHash();go(h.v,h.a,false)});
function render(){
  document.querySelectorAll('nav.bottom button').forEach(b=>b.classList.toggle('on',b.dataset.go===navDe(cur.v)));
  const f={hoje:vHoje,semana:vSemana,dia:vDia,sumario:vSumario,res:vRes,run:vRun,sobre:vSobre}[cur.v]||vHoje;
  V.innerHTML=f(cur.a);
  atualizaChip();
}
const navDe=v=>({hoje:'hoje',dia:'hoje',semana:'semana',sumario:'sumario',res:'res',run:'hoje',sobre:'hoje'})[v]||'hoje';
function atualizaChip(){
  const s=stat(QS);
  $('#chip').textContent=`📊 ${s.resp}/${s.tot}${s.pct!==null?' · '+s.pct+'%':''}`;
}

/* ---------- HOJE ---------- */
function vHoje(){
  const n=diaHoje(),d=DIAS[n-1],w=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'][new Date().getDay()];
  const fim=new Date().getDay()%6===0;
  const s=stat(QS),sug=sugestoes().slice(0,2);
  return `<h2>Hoje é ${w}</h2>
  <p class="muted">${fim?'Fim de semana: use para recuperar o que ficou pendente.':'Seu plano de estudo de hoje:'}</p>
  <div class="card click" data-act="dia" data-a="${n}">
    <div class="row sb"><div class="grow"><span class="tag">Dia ${n} · ${d.sem}</span><span class="tag">${d.tipo}</span>
    <div class="nm"><b>${esc(d.tit)}</b></div><div class="muted">${DQ[n].length} questões · ${stat(DQ[n]).resp} respondidas</div></div><div class="pct">${fmt(stat(DQ[n]).pct)}</div></div>
    ${bar(DQ[n])}
    <div class="btns"><button class="b" data-act="cont" data-a="${n}">▶ ${stat(DQ[n]).resp?'Continuar o dia':'Começar o dia'}</button><button class="b sec" data-act="dia" data-a="${n}">Ver roteiro</button></div>
  </div>
  <h3>Sugestões agora</h3>${sug.map(sugHtml).join('')}
  <button class="b sec full" data-act="go" data-a="res">Ver todos os resultados e sugestões</button>
  <h3>Treino livre</h3>
  <div class="btns"><button class="b sec" data-act="livre" data-a="10">10 questões</button><button class="b sec" data-act="livre" data-a="20">20 questões</button><button class="b sec" data-act="erros">Refazer meus erros</button></div>
  <p class="muted" style="margin-top:14px">${s.resp} de ${s.tot} questões respondidas no total (básico, AVI e desafio).</p>`;
}

/* ---------- SEMANA ---------- */
function vSemana(){
  return `<h2>Plano de 5 dias</h2>
  <p class="muted">Segunda a quarta: básico (TTI+), uma terça parte de cada capítulo por dia. Quinta: AVI. Sexta: avançado (desafio) e revisão. Todos os dias seguem a ordem de aprendizado.</p>`+
  DIAS.map(d=>{const s=stat(DQ[d.n]);const tp=[...new Set(DQ[d.n].map(q=>q.tema))].length;
   return `<div class="card click" data-act="dia" data-a="${d.n}"><div class="row sb"><div class="grow">
   <span class="tag">Dia ${d.n} · ${d.sem}</span><span class="tag">${d.tipo}</span><div><b>${esc(d.tit)}</b></div>
   <div class="muted">${s.tot} questões · ${tp} capítulos · ~${tempo(d.n)}</div></div><div class="pct sem ${cor(s.pct)}">${fmt(s.pct)}</div></div>${bar(DQ[d.n])}</div>`}).join('')+
  `<div class="card"><b>Como funciona</b><ol style="margin:6px 0 0;padding-left:20px"><li>Abra o dia e siga o roteiro (ler → questões → revisar erros).</li><li>Use a dica só depois de tentar.</li><li>A qualquer momento, toque em <b>📊</b> para ver resultados e sugestões.</li></ol></div>`;
}
function tempo(n){
  const q=DQ[n],pg=TEMAS.reduce((a,t)=>{const r=faixa(q.filter(x=>x.tema===t.nome));return a+(r?r[1]-r[0]+1:0)},0);
  const m=Math.round(q.length*1.5+pg*1.5);return `${Math.floor(m/60)}h${String(m%60).padStart(2,'0')}`;
}

/* ---------- DIA (roteiro + sumário do dia) ---------- */
function vDia(n){
  n=+n||diaHoje();const d=DIAS[n-1],qs=DQ[n],s=stat(qs);
  const temas=TEMAS.filter(t=>qs.some(q=>q.tema===t.nome));
  const erros=qs.filter(q=>P.r[q.id]&&!P.r[q.id].ok);
  const ck=(k)=>!!P.chk[k];
  const li=(k,html)=>`<label class="chk"><input type="checkbox" data-act="chk" data-a="${k}" ${ck(k)?'checked':''}><span>${html}</span></label>`;
  const tabs=`<div class="days">${DIAS.map(x=>`<button class="${x.n===n?'on':''}" data-act="dia" data-a="${x.n}"><b>${x.n}</b>${x.sem.slice(0,3)}</button>`).join('')}</div>`;
  const leit=temas.map(t=>{const r=faixa(qs.filter(q=>q.tema===t.nome));
    return li(`d${n}-l-${TI[t.nome]}`,`<b>${esc(t.nome)}</b> — ler ${rotPg(r,t.ap)}<br><span class="muted">capítulo completo: p. ${t.pag[0]}–${t.pag[1]}</span>`)}).join('');
  return `${tabs}<div class="row sb"><div class="grow"><h2 style="margin:0">Dia ${n} · ${d.sem}</h2><div class="muted">${esc(d.tit)} · ${d.tipo}</div></div><div class="pct sem ${cor(s.pct)}">${fmt(s.pct)}</div></div>
  ${bar(qs)}<p class="muted">${esc(d.obj)} Tempo estimado: ${tempo(n)}. Meta: ≥ ${MIN}% de acertos.</p>
  <div class="btns"><button class="b" data-act="cont" data-a="${n}">▶ ${s.resp?'Continuar':'Começar'} (${s.tot-s.resp} pendentes)</button>
  <button class="b sec" data-act="errosdia" data-a="${n}" ${erros.length?'':'disabled'}>Refazer erros (${erros.length})</button></div>
  <h3>Roteiro do dia</h3><div class="card">
   ${li(`d${n}-1`,'<b>1. Aquecimento (5 min)</b> — passe os olhos no sumário do dia abaixo.')}
   <div class="chk"><span style="width:22px"></span><span><b>2. Leitura dirigida</b> — leia só as páginas indicadas, na apostila ${n===4?'Digital AVI':'digital TTI+'}:</span></div>${leit}
   <div class="chk"><input type="checkbox" disabled ${s.done?'checked':''}><span><b>3. Questões do dia</b> — ${s.tot} questões em ordem de aprendizado (${s.resp}/${s.tot}).</span></div>
   <div class="chk"><input type="checkbox" disabled ${s.done&&!erros.length?'checked':''}><span><b>4. Revisão dos erros</b> — refaça os que errou e leia a explicação.</span></div>
   ${li(`d${n}-5`,'<b>5. Fechamento (3 min)</b> — abra 📊 Resultados e veja as sugestões.')}
  </div>
  <h3>Sumário do dia (toque para estudar o capítulo)</h3><div class="card">${temas.map(t=>{const l=qs.filter(q=>q.tema===t.nome),st=stat(l);
    return `<div class="trow" data-act="runtema" data-a="${TI[t.nome]}|${n}"><div class="grow"><div class="nm">${esc(t.nome)}</div><div class="muted">${t.mod} · ${l.length} questões · ${rotPg(faixa(l),t.ap)}</div>${bar(l)}</div><div class="pct sem ${cor(st.pct)}">${fmt(st.pct)}</div></div>`}).join('')}</div>`;
}

/* ---------- SUMÁRIO (por dia / por tema) ---------- */
let sumMode='tema';
function vSumario(a){
  if(a==='dia'||a==='tema')sumMode=a;
  const seg=`<div class="seg"><button class="${sumMode==='dia'?'on':''}" data-act="sum" data-a="dia">Por dia</button><button class="${sumMode==='tema'?'on':''}" data-act="sum" data-a="tema">Por capítulo</button></div>`;
  if(sumMode==='dia'){
    return `<h2>Sumário</h2>${seg}`+DIAS.map(d=>{const qs=DQ[d.n],temas=TEMAS.filter(t=>qs.some(q=>q.tema===t.nome)),s=stat(qs);
      return `<details class="mod" ${d.n===diaHoje()?'open':''}><summary><span>Dia ${d.n} · ${d.sem} — ${esc(d.tit)}</span><span class="pct sem ${cor(s.pct)}">${fmt(s.pct)}</span></summary>
      <div class="muted" style="margin-bottom:4px">${s.resp}/${s.tot} respondidas · <a href="#dia/${d.n}" data-act="dia" data-a="${d.n}">abrir roteiro do dia</a></div>
      ${temas.map(t=>{const l=qs.filter(q=>q.tema===t.nome),st=stat(l);return `<div class="trow" data-act="runtema" data-a="${TI[t.nome]}|${d.n}"><div class="grow"><div class="nm">${esc(t.nome)}</div><div class="muted">${l.length} questões · ${rotPg(faixa(l),t.ap)}</div></div><div class="pct sem ${cor(st.pct)}">${fmt(st.pct)}</div></div>`}).join('')}</details>`}).join('');
  }
  const mods=[...new Set(TEMAS.map(t=>t.mod))];
  return `<h2>Sumário</h2>${seg}`+mods.map(m=>{const ts=TEMAS.filter(t=>t.mod===m),all=QS.filter(q=>ts.some(t=>t.nome===q.tema)),s=stat(all);
    return `<details class="mod"><summary><span>${esc(m)}</span><span class="pct sem ${cor(s.pct)}">${s.resp}/${s.tot} · ${fmt(s.pct)}</span></summary>`+
    ts.map(t=>{const l=QS.filter(q=>q.tema===t.nome),st=stat(l),nb=l.filter(q=>q.n===1).length,nd=l.length-nb;
      return `<div class="trow" data-act="runtema" data-a="${TI[t.nome]}|0"><div class="grow"><div class="nm">${esc(t.nome)}</div><div class="muted">${nb} padrão${nd?' · '+nd+' desafio':''} · capítulo p. ${t.pag[0]}–${t.pag[1]} (${t.ap})</div>${bar(l)}</div><div class="pct sem ${cor(st.pct)}">${fmt(st.pct)}</div></div>`}).join('')+`</details>`}).join('');
}

/* ---------- RESULTADOS + SUGESTÕES ---------- */
function sugestoes(){
  const out=[];const s=stat(QS);
  if(!s.resp){const n=diaHoje();out.push({k:'a',t:`Comece pelo Dia ${n} (${DIAS[n-1].sem}). São ${DQ[n].length} questões em ordem de aprendizado.`,btn:['cont',n,'▶ Começar']});return out;}
  TEMAS.forEach(t=>{
    const l=QS.filter(q=>q.tema===t.nome),st=stat(l);
    if(st.resp>=2&&st.pct<MIN){
      const err=l.filter(q=>P.r[q.id]&&!P.r[q.id].ok);const r=faixa(err.length?err:l);
      out.push({k:st.pct<50?'r':'a',pct:st.pct,t:`<b>Reforçar “${esc(t.nome)}”</b> (${st.ok}/${st.resp} acertos, ${st.pct}%). Releia ${rotPg(r,t.ap)} e refaça os erros.`,btn:['errostema',TI[t.nome],`Refazer erros (${err.length})`]});
    }
  });
  out.sort((a,b)=>a.pct-b.pct);
  DIAS.forEach(d=>{const st=stat(DQ[d.n]);if(st.resp&&!st.done)out.push({k:'a',t:`Faltam <b>${st.tot-st.resp}</b> questões no <b>Dia ${d.n} (${d.sem})</b>.`,btn:['cont',d.n,'▶ Continuar']})});
  if(s.resp>=10&&s.hint/s.resp>.4)out.push({k:'a',t:`Você usou dica em ${Math.round(s.hint/s.resp*100)}% das questões. Tente responder primeiro, sem dica, para medir o que realmente sabe.`});
  const fortes=TEMAS.filter(t=>{const st=stat(QS.filter(q=>q.tema===t.nome));return st.resp>=2&&st.pct>=90});
  if(fortes.length)out.push({k:'g',t:`<b>Pontos fortes:</b> ${fortes.slice(0,4).map(t=>esc(t.nome)).join(', ')}.`});
  if(!out.length||s.pct>=MIN&&!out.some(o=>o.k!=='g'))out.unshift({k:'g',t:s.done?'Você respondeu tudo! Refaça os erros e faça o treino livre para fixar.':'Bom ritmo! Continue o plano do dia para cobrir todos os temas.'});
  return out;
}
function sugHtml(s){return `<div class="sugg ${s.k==='r'?'r':s.k==='g'?'g':''}">${s.t}${s.btn?`<div class="btns"><button class="b sec" data-act="${s.btn[0]}" data-a="${s.btn[1]}">${s.btn[2]}</button></div>`:''}</div>`}
function vRes(){
  const s=stat(QS),mods=[...new Set(TEMAS.map(t=>t.mod))];
  return `<h2>Resultados</h2>
  <div class="kpis"><div class="kpi"><div class="muted">Respondidas</div><div class="n">${s.resp}/${s.tot}</div></div>
  <div class="kpi"><div class="muted">Acertos</div><div class="n">${fmt(s.pct)}</div><div class="sem ${cor(s.pct)}">${txt(s.pct)}</div></div>
  <div class="kpi"><div class="muted">Dicas usadas</div><div class="n">${s.hint}</div></div></div>
  <h3>Sugestões</h3>${sugestoes().map(sugHtml).join('')}
  <h3>Por dia</h3><div class="card">${DIAS.map(d=>{const st=stat(DQ[d.n]);return `<div class="trow" data-act="dia" data-a="${d.n}"><div class="grow"><div class="nm">Dia ${d.n} · ${d.sem} — ${esc(d.tit)}</div><div class="muted">${st.resp}/${st.tot} respondidas</div></div><div class="pct sem ${cor(st.pct)}">${fmt(st.pct)}</div></div>`}).join('')}</div>
  <h3>Por módulo e capítulo</h3>`+mods.map(m=>{const ts=TEMAS.filter(t=>t.mod===m),all=QS.filter(q=>ts.some(t=>t.nome===q.tema)),st=stat(all);
    return `<details class="mod"><summary><span>${esc(m)}</span><span class="pct sem ${cor(st.pct)}">${st.ok}/${st.resp} · ${fmt(st.pct)}</span></summary>`+
    ts.map(t=>{const x=stat(QS.filter(q=>q.tema===t.nome));return `<div class="trow" data-act="runtema" data-a="${TI[t.nome]}|0"><div class="grow"><div class="nm">${esc(t.nome)}</div><div class="muted">${x.resp}/${x.tot} respondidas — ${txt(x.pct)}</div></div><div class="pct sem ${cor(x.pct)}">${fmt(x.pct)}</div></div>`}).join('')+`</details>`}).join('')+
  `<div class="btns"><button class="b sec" data-act="erros">Refazer todos os meus erros</button><button class="b sec" data-act="reset">Zerar progresso</button></div>`;
}

/* ---------- SOBRE / instalar ---------- */
let instalar=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();instalar=e;});
function vSobre(){
  return `<h2>Sobre</h2><div class="card"><b>Simulado TTI IBREP</b><p class="muted">${QS.filter(q=>q.n===1).length} questões do básico e da AVI e ${QS.filter(q=>q.n===2).length} do desafio, baseadas nas apostilas do curso. Material de estudo não oficial: não substitui a prova nem a legislação vigente.</p>
  <p class="muted">Seu progresso fica salvo apenas neste aparelho.</p></div>
  <div class="card"><b>Instalar no celular</b><p class="muted">Android (Chrome): menu ⋮ → <i>Instalar app</i>. iPhone (Safari): Compartilhar → <i>Adicionar à Tela de Início</i>. Depois de aberto uma vez, funciona sem internet.</p>
  <button class="b full" data-act="instalar">Instalar app</button></div>`;
}

/* ---------- RUNNER (questões) ---------- */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function startRun(ids,titulo,volta,refazer){
  let lista=ids.map(id=>QID[id]).filter(Boolean);
  if(!refazer){const pend=lista.filter(q=>!P.r[q.id]);lista=pend}
  if(!lista.length){alert('Nada pendente aqui. Use “Refazer erros” ou o treino livre para praticar de novo.');return}
  R={ids:lista.map(q=>q.id),i:0,titulo,volta,ord:{},sel:null,done:false,hint:false,ses:{ok:0,n:0}};
  go('run');
}
function vRun(){
  if(!R)return vHoje();
  if(R.i>=R.ids.length)return fimRun();
  const q=QID[R.ids[R.i]];if(!R.ord[q.id])R.ord[q.id]=shuffle([0,1,2,3]);
  const ord=R.ord[q.id];const pct=Math.round(R.i/R.ids.length*100);
  const a=R.done?P.r[q.id]:null;const right=ord.indexOf(0);
  return `<div class="runbar"><div class="row sb"><span class="muted">${esc(R.titulo)}</span><span class="muted">${R.i+1} / ${R.ids.length}</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>
  <span class="tag">${esc(q.tema)}</span><span class="tag">${q.n===2?'Desafio':'Básico'}</span>
  <div class="q">${esc(q.q)}</div>
  <div>${ord.map((oi,k)=>`<button class="opt ${R.done?(k===right?'ok':(k===R.sel?'err':'')):(k===R.sel?'sel':'')}" data-act="pick" data-a="${k}" ${R.done?'disabled':''}><span class="l">${L[k]}</span><span>${esc(q.o[oi])}</span><span class="mk">${R.done?(k===right?'✓ Correta':(k===R.sel?'✗ Sua resposta':'')):''}</span></button>`).join('')}</div>
  ${R.hint&&!R.done?`<div class="box hint"><b class="t">💡 Dica</b>${esc(q.h)}</div>`:''}
  ${R.done?`<div class="box ${a.ok?'ok':'err'}"><b class="t">${a.ok?'✓ Correto!':'✗ Não foi dessa vez.'}</b>${esc(q.e)}<div class="muted" style="margin-top:6px">📖 Revisar: ${esc(q.f)}</div></div>`:''}
  <div class="btns">${R.done?`<button class="b" data-act="next">${R.i+1<R.ids.length?'Próxima →':'Ver resumo →'}</button>`
   :`<button class="b sec" data-act="hint" ${R.hint?'disabled':''}>💡 Dica</button><button class="b" data-act="check" ${R.sel===null?'disabled':''}>Verificar</button>`}</div>
  <div class="btns"><button class="b sec" data-act="sair">⏸ Pausar e voltar</button><button class="b sec" data-act="go" data-a="res">📊 Resultados</button></div>`;
}
function checar(){
  const q=QID[R.ids[R.i]],ord=R.ord[q.id],ok=ord[R.sel]===0,prev=P.r[q.id]||{};
  P.r[q.id]={ok,dica:R.hint,tent:(prev.tent||0)+1,t:Date.now(),prim:prev.prim===undefined?ok:prev.prim};
  save();R.done=true;R.ses.n++;if(ok)R.ses.ok++;render();
}
function fimRun(){
  const ses=R.ses,p=ses.n?Math.round(ses.ok/ses.n*100):0;
  const erros=R.ids.filter(id=>P.r[id]&&!P.r[id].ok);
  return `<h2>Bloco concluído</h2><div class="kpis"><div class="kpi"><div class="muted">Acertos</div><div class="n">${ses.ok}/${ses.n}</div></div>
  <div class="kpi"><div class="muted">Aproveitamento</div><div class="n">${p}%</div><div class="sem ${cor(p)}">${txt(p)}</div></div></div>
  <h3>Sugestões</h3>${sugestoes().slice(0,3).map(sugHtml).join('')}
  <div class="btns"><button class="b" data-act="voltarRun">Voltar</button>
  <button class="b sec" data-act="refazerErros" ${erros.length?'':'disabled'}>Refazer erros do bloco (${erros.length})</button>
  <button class="b sec" data-act="go" data-a="res">📊 Resultados</button></div>`;
}

/* ---------- ações ---------- */
function acao(act,a){
  switch(act){
    case 'go':go(a);break;
    case 'dia':go('dia',a);break;
    case 'sum':go('sumario',a);break;
    case 'cont':startRun(DQ[a].map(q=>q.id),`Dia ${a} · ${DIAS[a-1].sem}`,['dia',a]);break;
    case 'errosdia':startRun(DQ[a].filter(q=>P.r[q.id]&&!P.r[q.id].ok).map(q=>q.id),`Erros do Dia ${a}`,['dia',a],true);break;
    case 'runtema':{const [ti,d]=a.split('|').map(Number),t=TEMAS[ti];
      const l=QS.filter(q=>q.tema===t.nome&&(!d||q.dia===d)).sort(byOrd);
      startRun(l.map(q=>q.id),t.nome,d?['dia',d]:['sumario',null]);break}
    case 'errostema':{const t=TEMAS[a];startRun(QS.filter(q=>q.tema===t.nome&&P.r[q.id]&&!P.r[q.id].ok).map(q=>q.id),`Erros: ${t.nome}`,['res',null],true);break}
    case 'erros':startRun(QS.filter(q=>P.r[q.id]&&!P.r[q.id].ok).sort(byOrd).map(q=>q.id),'Meus erros',['res',null],true);break;
    case 'livre':{const pool=shuffle(QS.filter(q=>q.n===1)),pend=pool.filter(q=>!P.r[q.id]);
      startRun(shuffle(pend.length>=a?pend:pool).slice(0,+a).sort(byOrd).map(q=>q.id),`Treino livre (${a})`,['hoje',null],true);break}
    case 'pick':if(R&&!R.done){R.sel=+a;render()}break;
    case 'hint':if(R){R.hint=true;render()}break;
    case 'check':if(R&&R.sel!==null)checar();break;
    case 'next':R.i++;R.sel=null;R.done=false;R.hint=false;render();window.scrollTo(0,0);break;
    case 'sair':if(R)go(R.volta[0],R.volta[1]);break;
    case 'voltarRun':if(R)go(R.volta[0],R.volta[1]);R=null;break;
    case 'refazerErros':{const ids=R.ids.filter(id=>P.r[id]&&!P.r[id].ok);startRun(ids,'Revisão de erros',R.volta,true);break}
    case 'reset':if(confirm('Zerar todo o progresso deste aparelho?')){P={r:{},chk:{}};save();R=null;render()}break;
    case 'instalar':if(instalar){instalar.prompt();instalar=null}else alert('Use o menu do navegador: “Instalar app” (Android) ou Compartilhar → “Adicionar à Tela de Início” (iPhone).');break;
  }
}
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');if(!el)return;
  if(el.matches('input[type=checkbox]'))return;
  const act=el.dataset.act;if(act==='chk')return;
  if(el.tagName==='A')e.preventDefault();
  e.stopPropagation();acao(act,el.dataset.a);
});
document.addEventListener('change',e=>{const el=e.target.closest('[data-act="chk"]');if(el){P.chk[el.dataset.a]=el.checked;save()}});
$('#chip').addEventListener('click',()=>go('res'));
document.querySelectorAll('nav.bottom button').forEach(b=>b.addEventListener('click',()=>{
  const g=b.dataset.go;go(g,g==='sumario'?sumMode:null);
}));
$('#logo').addEventListener('click',()=>go('sobre'));

/* ---------- init ---------- */
if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
const h=parseHash();
cur={v:h.v==='run'?'hoje':h.v,a:h.a};
render();
window.__tti={QS,DQ,P:()=>P,stat,sugestoes};
})();
