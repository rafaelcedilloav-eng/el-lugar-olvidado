/**
 * RAFA OS - Module: Debate Engine v3.0
 * Status: Bulletproof / Debug Mode Active
 */

// ── CONFIG (Asegúrate de que los Slugs coincidan con la URL) ─────────────────
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
    { id: 'determinismo', nombre: 'Determinismo', desc: 'Nuestras decisiones son producto de causas previas.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'compatibilismo', nombre: 'Compatibilismo', desc: 'La libertad y el determinismo pueden coexistir.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' },
    { id: 'libertarismo', nombre: 'Libertarismo', desc: 'Somos genuinamente libres.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)' },
    { id: 'escepticismo', nombre: 'Escepticismo', desc: 'El libre albedrío es una ilusión útil.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)' }
  ],
  'debate-moral': [
    { id: 'relativismo', nombre: 'Relativismo', desc: 'La moral es cultural y contextual.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'universalismo', nombre: 'Universalismo', desc: 'Principios morales válidos para todos.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' }
  ]
};

const state = {
  user: null, db: window.__ELO?.getClient(),
  debateSlug: null, debateId: null, posturaId: null, posturaObj: null
};

// ── INIT ─────────────────────────────────────────────────────────────────────
async function initDebate() {
  console.log("🚀 [Rafa OS] Iniciando...");

  const params = new URLSearchParams(window.location.search);
  state.debateSlug = params.get('id');
  state.debateId = DEBATE_UUID_MAP[state.debateSlug];

  console.log("Debate Slug:", state.debateSlug);
  console.log("Debate ID:", state.debateId);

  if (!state.debateId) return console.error("❌ Error: Debate ID no encontrado para este slug.");

  const { data: { user } } = await state.db.auth.getUser();
  if (!user) return console.warn("⚠️ No hay usuario logueado.");
  state.user = user;

  // Título
  const elTitulo = document.getElementById('debate-titulo');
  if (elTitulo) elTitulo.textContent = state.debateSlug.replace(/-/g, ' ');

  // Verificar si ya participa
  const { data: part } = await state.db.from('participantes_debate').select('*').eq('debate_id', state.debateId).eq('user_id', user.id).maybeSingle();

  if (part?.aprobado_reglamento) {
    console.log("✅ Usuario ya es participante.");
    state.posturaId = part.postura_id;
    mostrarFase('fase-debate');
    cargarMensajes();
  } else {
    console.log("🎨 Renderizando burbujas...");
    mostrarFase('fase-posturas'); 
    renderBurbujas();
  }
}

function renderBurbujas() {
  const container = document.getElementById('debate-burbujas');
  if (!container) return console.error("❌ Error: No existe el div con id='debate-burbujas'");

  const posturas = POSTURAS_CONFIG[state.debateSlug] || [];
  console.log("Posturas a renderizar:", posturas);

  if (posturas.length === 0) {
    container.innerHTML = "<p style='color:red'>Error: No hay configuradas posturas para este debate.</p>";
    return;
  }

  container.innerHTML = posturas.map(p => `
    <div class="debate-burbuja" onclick="seleccionarPostura('${p.id}')" id="burbuja-${p.id}" style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder}">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('') + `
    <div style="grid-column: 1/-1; display:flex; justify-content:center; margin-top:20px;">
        <button id="btn-confirmar" class="debate-confirmar-btn" disabled onclick="alert('Postura seleccionada!')">Confirmar Postura</button>
    </div>
  `;
}

function seleccionarPostura(id) {
  document.querySelectorAll('.debate-burbuja').forEach(b => b.classList.toggle('seleccionada', b.id === `burbuja-${id}`));
  state.posturaId = POSTURA_UUID_MAP[id];
  document.getElementById('btn-confirmar').disabled = false;
  console.log("Seleccionada:", id);
}

function mostrarFase(faseId) {
  console.log("Cambiando a fase:", faseId);
  document.querySelectorAll('.debate-fase').forEach(f => f.classList.add('oculto'));
  const target = document.getElementById(faseId);
  if (target) {
    target.classList.remove('oculto');
  } else {
    console.error(`❌ Error: No se encontró la sección con id='${faseId}'`);
  }
}

// Cargar mensajes básico para que no rompa
async function cargarMensajes() {
    const container = document.getElementById('debate-mensajes');
    if (container) container.innerHTML = "Cargando mensajes...";
}

document.addEventListener('DOMContentLoaded', initDebate);