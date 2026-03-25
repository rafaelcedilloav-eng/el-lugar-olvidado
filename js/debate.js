/**
 * RAFA OS - Module: Debate Engine v2.6
 * Fix: Título seguro & Examen Render
 */

// ... (Mantén tus DEBATE_UUID_MAP, POSTURA_UUID_MAP y POSTURAS_CONFIG igual que antes) ...

// ── APP STATE ──────────────────────────────────────────────────────────────
const state = {
  user: null, profile: null, debateId: null, debateSlug: null,
  posturaId: null, posturaObj: null, cita: { id: null, texto: null },
  db: window.__ELO?.getClient()
};

const NIVELES_ICONOS = ['🎭','🕯️','📖','⚡','🏛️','🔥','🪶','⚗️','🌀','👁️','🜂'];

// ── CORE ENGINE ──────────────────────────────────────────────────────────────
async function initDebate() {
  const params = new URLSearchParams(window.location.search);
  state.debateSlug = params.get('id');
  state.debateId = DEBATE_UUID_MAP[state.debateSlug];

  if (!state.debateId) return;

  const { data: { user } } = await state.db.auth.getUser();
  if (!user) return;
  state.user = user;

  const profile = await query(state.db.from('profiles').select('nivel').eq('id', user.id).maybeSingle());
  state.profile = profile;
  if (profile?.nivel === 0) return activarProtocoloBufon();

  // FIX: Títulos seguros (si no existe el ID, no rompe el script)
  const titulos = { 'debate-libre-albedrio': 'El Libre Albedrío No Es Libertad', 'debate-moral': 'La Moral que Nadie Eligió', 'debate-conciencia': 'La Conciencia Como Base', 'debate-tiempo': 'El Tiempo No Existe' };
  const txtTitulo = titulos[state.debateSlug] || state.debateSlug;
  ['debate-titulo', 'debate-titulo-2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = txtTitulo;
  });

  const part = await query(state.db.from('participantes_debate').select('*').eq('debate_id', state.debateId).eq('user_id', user.id).maybeSingle());

  if (part?.aprobado_reglamento) {
    state.posturaId = part.postura_id;
    state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => POSTURA_UUID_MAP[p.id] === part.postura_id);
    mostrarFaseDebate();
  } else {
    mostrarFase('fase-seleccion');
    renderBurbujas();
  }
}

// ── API HELPER ───────────────────────────────────────────────────────────────
async function query(promise) {
  const { data, error } = await promise;
  if (error) {
    if (error.code === '42501') { await state.db.rpc('marcar_bufon_manual', { target_user_id: state.user.id }); activarProtocoloBufon(); }
    return null;
  }
  return data;
}

// ── UI RENDERING ──────────────────────────────────────────────────────────────
function renderBurbujas() {
  const container = document.getElementById('debate-burbujas');
  if (!container) return;
  container.innerHTML = POSTURAS_CONFIG[state.debateSlug].map(p => `
    <div class="debate-burbuja" onclick="seleccionarPostura('${p.id}')" id="burbuja-${p.id}" style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder}">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('') + `<div class="debate-confirmar-wrap" style="grid-column:1/-1"><button class="debate-confirmar-btn" id="btn-confirmar" onclick="prepararExamen()" disabled>Esta es mi postura</button></div>`;
}

function prepararExamen() {
  mostrarFase('fase-examen');
  const container = document.getElementById('examen-preguntas');
  container.innerHTML = PREGUNTAS_EXAMEN.map((p, i) => `
    <div class="pregunta-bloque">
      <p class="pregunta-texto">${i + 1}. ${p.texto}</p>
      <div class="opciones-grid">
        ${p.opciones.map((o, oi) => `<label class="opcion-item"><input type="radio" name="pregunta-${i}" value="${oi}"> <span>${o}</span></label>`).join('')}
      </div>
    </div>
  `).join('');
}

function seleccionarPostura(id) {
  document.querySelectorAll('.debate-burbuja').forEach(b => b.classList.toggle('seleccionada', b.id === `burbuja-${id}`));
  state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => p.id === id);
  state.posturaId = POSTURA_UUID_MAP[id];
  document.getElementById('btn-confirmar').disabled = false;
}

// ... (Mantén enviarExamen, enviarMensaje, cargarMensajes y renderMensaje de la versión anterior) ...

// Asegúrate de que enviarMensaje use state.cita y query()
async function enviarMensaje() {
    const input = document.getElementById('debate-input');
    const contenido = input.value.trim();
    if (!contenido || input.disabled) return;
    input.disabled = true;

    const success = await query(state.db.from('mensajes_debate').insert({
        debate_id: state.debateId, postura_id: state.posturaId, autor_id: state.user.id,
        contenido, cita: state.cita.texto, responde_a: state.cita.id
    }));

    if (success) { input.value = ''; quitarCita(); await cargarMensajes(); }
    input.disabled = false;
}

// ... (Muestra fase debate y utilerías iguales) ...
async function mostrarFaseDebate() {
  mostrarFase('fase-debate');
  const tuPosturaEl = document.getElementById('debate-tu-postura');
  if (tuPosturaEl && state.posturaObj) {
      tuPosturaEl.innerHTML = `<div class="debate-tu-postura-dot" style="background:${state.posturaObj.color}"></div>Postura: <strong style="color:${state.posturaObj.color}">${state.posturaObj.nombre}</strong>`;
  }
  cargarMensajes(); 
  suscribirRealtime();
}

function mostrarFase(f) { 
    document.querySelectorAll('.debate-fase').forEach(el => el.classList.add('oculto'));
    const target = document.getElementById(f);
    if (target) target.classList.remove('oculto');
}

function suscribirRealtime() {
    state.db.channel(`debate-${state.debateId}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_debate', filter: `debate_id=eq.${state.debateId}` }, () => cargarMensajes())
    .subscribe();
}

document.addEventListener('DOMContentLoaded', initDebate);