/**
 * RAFA OS - Augmented Intelligence Architecture
 * Module: Debate System v2.5 (Refactored)
 * Integrity Level: Senior / Zero-Trust
 */

// ── DATA & CONFIG (El ADN del Sistema) ───────────────────────────────────────
const DEBATE_UUID_MAP = {
  'debate-libre-albedrio': '0fd5b9a3-c8cb-459d-9e2f-e7791b8d21e1',
  'debate-moral':          '4cc14c5f-98a2-4e5d-b282-0dc07a56b5f5',
  'debate-conciencia':     'acaf7505-e33e-4ddc-9ea4-36363ce943f8',
  'debate-tiempo':         '3c228fcf-9c20-4c84-9648-3710b54e0d57'
};

const POSTURA_UUID_MAP = {
  'compatibilismo': '2198f51a-f715-41ad-8d12-1ca79a1fe2c1', 'determinismo': '927985f5-aea1-4db7-bffa-6500f1cc9fe9',
  'escepticismo': '91eefbeb-8d1e-49b8-8150-edc7ffdbf8c5', 'libertarismo': '7c07dca6-ec8d-4405-888e-37115eaea9ef',
  'eternismo': '514d3bda-5931-461f-900a-1dcb5421eb09', 'presentismo': 'ffa4df9a-d542-402d-94a3-0ff13fbf57ef',
  'realismo-temporal': '1d843715-b2ef-4bb7-b927-7e7961320e7f', 'relacionismo': '4c776c16-39c1-4953-9aa8-e6a0d4480dec',
  'construccionismo': '819c04f5-0189-4602-b8b5-1c0cd1fcfcb9', 'nihilismo-moral': '77e1a30e-28a7-4d11-83a3-4fb7c7d77bde',
  'relativismo': '63e21d61-1fb5-42f6-8dcb-300e6deba265', 'universalismo': 'c60efb7e-05cb-4b08-a49f-b4379fbb603f',
  'dualismo': 'c19c4993-4469-44d5-8f9e-dbb79d2213a6', 'idealismo': 'f1a0afee-f1e1-43ad-962d-0475efcf9eb6',
  'materialismo': '36dd88a4-598d-4b35-b0ef-e62396699536', 'panpsiquismo': 'ee9c9220-9e2d-4385-9b83-0c89c8b3f7f7'
};

const POSTURAS_CONFIG = {
  'debate-libre-albedrio': [
    { id: 'determinismo', nombre: 'Determinismo', desc: 'Nuestras decisiones son producto de causas previas, no de libertad real.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)', colorShadow: 'rgba(96,165,250,0.12)' },
    { id: 'compatibilismo', nombre: 'Compatibilismo', desc: 'La libertad y el determinismo pueden coexistir sin contradicción.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'libertarismo', nombre: 'Libertarismo filosófico', desc: 'Somos genuinamente libres más allá de las causas que nos precedieron.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)', colorShadow: 'rgba(52,211,153,0.12)' },
    { id: 'escepticismo', nombre: 'Escepticismo', desc: 'El libre albedrío es una ilusión útil que el sistema necesita para funcionar.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)', colorShadow: 'rgba(251,146,60,0.12)' }
  ],
  'debate-moral': [
    { id: 'relativismo', nombre: 'Relativismo', desc: 'La moral es cultural y contextual, no existe una moral universal válida.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)', colorShadow: 'rgba(96,165,250,0.12)' },
    { id: 'universalismo', nombre: 'Universalismo', desc: 'Existen principios morales válidos para toda la humanidad, en todo tiempo.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'construccionismo', nombre: 'Construccionismo', desc: 'La moral se construye colectivamente, no se hereda ni se descubre.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)', colorShadow: 'rgba(52,211,153,0.12)' },
    { id: 'nihilismo-moral', nombre: 'Nihilismo moral', desc: 'La moral no tiene fundamento objetivo. Todo juicio moral es una proyección.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)', colorShadow: 'rgba(251,146,60,0.12)' }
  ],
  'debate-conciencia': [
    { id: 'materialismo', nombre: 'Materialismo', desc: 'La conciencia es producto del cerebro y la materia. Nada más existe.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)', colorShadow: 'rgba(96,165,250,0.12)' },
    { id: 'panpsiquismo', nombre: 'Panpsiquismo', desc: 'La conciencia es una propiedad fundamental del universo, no solo del cerebro.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'dualismo', nombre: 'Dualismo', desc: 'Mente y materia son realidades distintas que no se reducen la una a la otra.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)', colorShadow: 'rgba(52,211,153,0.12)' },
    { id: 'idealismo', nombre: 'Idealismo', desc: 'La conciencia precede y genera la materia. La realidad es mental en su origen.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)', colorShadow: 'rgba(251,146,60,0.12)' }
  ],
  'debate-tiempo': [
    { id: 'realismo-temporal', nombre: 'Realismo temporal', desc: 'El tiempo es real e independiente de nuestra percepción o experiencia.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)', colorShadow: 'rgba(96,165,250,0.12)' },
    { id: 'presentismo', nombre: 'Presentismo', desc: 'Solo existe el momento presente. Pasado y futuro son construcciones mentales.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'eternismo', nombre: 'Eternismo', desc: 'Pasado, presente y futuro coexisten simultáneamente en un bloque temporal.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)', colorShadow: 'rgba(52,211,153,0.12)' },
    { id: 'relacionismo', nombre: 'Relacionismo', desc: 'El tiempo no existe como entidad. Solo existe la transformación de las cosas.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)', colorShadow: 'rgba(251,146,60,0.12)' }
  ]
};

const PREGUNTAS_EXAMEN = [
  { texto: '¿Qué debes hacer al responder el argumento de otro participante?', opciones: ['Ignorar lo que dijo', 'Citar el fragmento específico', 'Resumir todo', 'Preguntarle'], correcta: 1 },
  { texto: '¿Cuántas infracciones por irrespeto resultan en mute?', opciones: ['2', '3', '4', '5'], correcta: 2 },
  { texto: '¿Si deseas cambiar de postura?', opciones: ['Solo elegir otra', 'Escribir explicación de 200 carac.', 'Pedir permiso', 'Esperar 24h'], correcta: 1 },
  { texto: '¿Propósito principal?', opciones: ['Ganar', 'Hacer quedar mal', 'Defender con argumentos genuinos', 'Acumular msgs'], correcta: 2 },
  { texto: '¿Si 3 de un mismo lado no responden?', opciones: ['Pausa', 'Victoria contraria', 'Reinicia turno', 'Nada'], correcta: 1 }
];

const NIVELES_ICONOS = ['🎭','🕯️','📖','⚡','🏛️','🔥','🪶','⚗️','🌀','👁️','🜂'];

// ── APP STATE (El Corazón de Rafa OS) ────────────────────────────────────────
const state = {
  user: null, profile: null, debateId: null, debateSlug: null,
  posturaId: null, posturaObj: null, cita: { id: null, texto: null },
  db: window.__ELO?.getClient()
};

// ── CORE ENGINE ──────────────────────────────────────────────────────────────
async function initDebate() {
  const params = new URLSearchParams(window.location.search);
  state.debateSlug = params.get('id');
  state.debateId = DEBATE_UUID_MAP[state.debateSlug];

  if (!state.debateId) return document.body.innerHTML = '<div class="debate-vacio">Debate no encontrado.</div>';

  const { data: { user } } = await state.db.auth.getUser();
  if (!user) return;
  state.user = user;

  const profile = await query(state.db.from('profiles').select('nivel').eq('id', user.id).maybeSingle());
  state.profile = profile;

  if (profile?.nivel === 0) return activarProtocoloBufon();

  const titulos = { 'debate-libre-albedrio': 'El Libre Albedrío No Es Libertad', 'debate-moral': 'La Moral que Nadie Eligió', 'debate-conciencia': 'La Conciencia Como Base', 'debate-tiempo': 'El Tiempo No Existe' };
  document.getElementById('debate-titulo').textContent = document.getElementById('debate-titulo-2').textContent = titulos[state.debateSlug] || state.debateSlug;

  const part = await query(state.db.from('participantes_debate').select('*').eq('debate_id', state.debateId).eq('user_id', user.id).maybeSingle());

  if (part?.aprobado_reglamento) {
    state.posturaId = part.postura_id;
    state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => POSTURA_UUID_MAP[p.id] === part.postura_id);
    mostrarFaseDebate();
  } else {
    renderBurbujas();
  }
}

// ── API HELPER (The "No-Grease" Zone) ────────────────────────────────────────
async function query(promise) {
  const { data, error } = await promise;
  if (error) {
    console.error(`[Error]: ${error.code}`, error);
    if (error.code === '42501') { await state.db.rpc('marcar_bufon_manual', { target_user_id: state.user.id }); activarProtocoloBufon(); }
    return null;
  }
  return data;
}

// ── ACTIONS ──────────────────────────────────────────────────────────────────
async function enviarExamen() {
  const nota = document.getElementById('examen-nota');
  const rtas = PREGUNTAS_EXAMEN.map((_, i) => document.querySelector(`input[name="pregunta-${i}"]:checked`)?.value);
  
  if (rtas.includes(undefined)) return nota.textContent = 'Responde todas.';
  const correctas = rtas.filter((r, i) => parseInt(r) === PREGUNTAS_EXAMEN[i].correcta).length;

  if (correctas < 4) return nota.textContent = `${correctas}/5. Necesitas 4.`;

  await query(state.db.from('examenes_reglamento').insert({ user_id: state.user.id, puntaje: correctas, aprobado: true }));
  await query(state.db.from('participantes_debate').upsert({ debate_id: state.debateId, user_id: state.user.id, postura_id: state.posturaId, texto_inicial: state.posturaObj.desc, aprobado_reglamento: true }));

  nota.textContent = '✦ Aprobado...';
  setTimeout(() => mostrarFaseDebate(), 1000);
}

async function enviarMensaje() {
  const input = document.getElementById('debate-input');
  const contenido = input.value.trim();
  if (!contenido || input.disabled) return;

  input.disabled = true;
  const success = await query(state.db.from('mensajes_debate').insert({
    debate_id: state.debateId, postura_id: state.posturaId, autor_id: state.user.id,
    contenido, cita: state.cita.texto, responde_a: state.cita.id, tipo: 'debate'
  }));

  if (success) { input.value = ''; quitarCita(); await cargarMensajes(); }
  input.disabled = false;
}

// ── UI RENDERING ──────────────────────────────────────────────────────────────
function renderBurbujas() {
  const container = document.getElementById('debate-burbujas');
  container.innerHTML = POSTURAS_CONFIG[state.debateSlug].map(p => `
    <div class="debate-burbuja" onclick="seleccionarPostura('${p.id}')" id="burbuja-${p.id}" style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder}">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('') + `<div class="debate-confirmar-wrap" style="grid-column:1/-1"><button class="debate-confirmar-btn" id="btn-confirmar" onclick="mostrarFase('fase-examen');renderExamen()" disabled>Esta es mi postura</button></div>`;
}

function seleccionarPostura(id) {
  document.querySelectorAll('.debate-burbuja').forEach(b => b.classList.toggle('seleccionada', b.id === `burbuja-${id}`));
  state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => p.id === id);
  state.posturaId = POSTURA_UUID_MAP[id];
  document.getElementById('btn-confirmar').disabled = false;
}

async function cargarMensajes() {
  const container = document.getElementById('debate-mensajes');
  const mensajes = await query(state.db.from('mensajes_debate').select('*, profiles(username, avatar_url, nivel)').eq('debate_id', state.debateId).is('responde_a', null).order('created_at', { ascending: true }));
  
  if (!mensajes?.length) return container.innerHTML = `<div class="debate-vacio">Sé el primero.</div>`;
  container.innerHTML = (await Promise.all(mensajes.map(m => renderMensaje(m, false)))).join('');
}

async function renderMensaje(m, esResp) {
  const p = m.profiles || {};
  const postura = POSTURAS_CONFIG[state.debateSlug]?.find(pos => POSTURA_UUID_MAP[pos.id] === m.postura_id);
  const avatar = p.avatar_url || `https://ui-avatars.com/api/?name=${p.username}&background=2D1F3D&color=C4A8E8`;
  
  let subHtml = '';
  if (!esResp) {
    const resps = await query(state.db.from('mensajes_debate').select('*, profiles(username, avatar_url, nivel)').eq('responde_a', m.id).order('created_at', { ascending: true }));
    if (resps?.length) subHtml = `<div class="debate-respuestas">${(await Promise.all(resps.map(r => renderMensaje(r, true)))).join('')}</div>`;
  }

  return `<div class="debate-mensaje">
    <div class="debate-mensaje-header">
      <img class="debate-mensaje-avatar" src="${avatar}">
      <span class="debate-mensaje-insignia">${NIVELES_ICONOS[p.nivel] || '🕯️'}</span>
      <span class="debate-mensaje-nombre" style="color:${postura?.color}">${p.username}</span>
    </div>
    ${m.cita ? `<p class="debate-mensaje-cita">"${m.cita}"</p>` : ''}
    <p class="debate-mensaje-contenido">${m.contenido}</p>
    ${!esResp ? `<button class="debate-mensaje-btn" onclick="responderA('${m.id}', '${m.contenido.replace(/'/g, "\\'")}')">Responder</button>` : ''}
  </div>${subHtml}`;
}

// ── UTILS & HANDLERS ──────────────────────────────────────────────────────────
function responderA(id, txt) { state.cita = { id, texto: txt.substring(0, 80) + '...' }; document.getElementById('debate-cita-texto').textContent = state.cita.texto; document.getElementById('debate-cita-preview').style.display = 'flex'; document.getElementById('debate-input').focus(); }
function quitarCita() { state.cita = { id: null, texto: null }; document.getElementById('debate-cita-preview').style.display = 'none'; }
function mostrarFase(f) { document.querySelectorAll('.debate-fase').forEach(el => el.classList.toggle('oculto', el.id !== f)); }
function activarProtocoloBufon() { document.getElementById('bufon-modal')?.classList.remove('oculto'); document.getElementById('debate-input-wrap').innerHTML = '<p class="bufon-msg">Tu voz ha sido silenciada permanentemente.</p>'; }
function suscribirRealtime() { state.db.channel(`debate-${state.debateId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_debate', filter: `debate_id=eq.${state.debateId}` }, cargarMensajes).subscribe(); }

async function mostrarFaseDebate() {
  mostrarFase('fase-debate');
  document.getElementById('debate-tu-postura').innerHTML = `<div class="debate-tu-postura-dot" style="background:${state.posturaObj.color}"></div>Postura: <strong style="color:${state.posturaObj.color}">${state.posturaObj.nombre}</strong>`;
  cargarMensajes(); suscribirRealtime();
}

document.addEventListener('DOMContentLoaded', initDebate);