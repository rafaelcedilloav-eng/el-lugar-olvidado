// ── CONFIGURACIÓN ORIGINAL ──
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
    { id: 'determinismo', nombre: 'Determinismo', desc: 'Nuestras decisiones son producto de causas previas, no de libertad real.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'compatibilismo', nombre: 'Compatibilismo', desc: 'La libertad y el determinismo pueden coexistir sin contradicción.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' },
    { id: 'libertarismo', nombre: 'Libertarismo', desc: 'Somos genuinamente libres más allá de las causas que nos precedieron.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)' },
    { id: 'escepticismo', nombre: 'Escepticismo', desc: 'El libre albedrío es una ilusión útil que el sistema necesita para funcionar.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)' }
  ],
  'debate-moral': [
    { id: 'relativismo', nombre: 'Relativismo', desc: 'La moral es cultural y contextual, no existe una moral universal válida.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'universalismo', nombre: 'Universalismo', desc: 'Existen principios morales válidos para toda la humanidad.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' },
    { id: 'construccionismo', nombre: 'Construccionismo', desc: 'La moral se construye colectivamente.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)' },
    { id: 'nihilismo-moral', nombre: 'Nihilismo moral', desc: 'La moral no tiene fundamento objetivo.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)' }
  ],
  'debate-conciencia': [
    { id: 'materialismo', nombre: 'Materialismo', desc: 'La conciencia es producto del cerebro y la materia.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'panpsiquismo', nombre: 'Panpsiquismo', desc: 'La conciencia es una propiedad fundamental del universo.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' },
    { id: 'dualismo', nombre: 'Dualismo', desc: 'Mente y materia son realidades distintas.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)' },
    { id: 'idealismo', nombre: 'Idealismo', desc: 'La conciencia precede y genera la materia.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)' }
  ],
  'debate-tiempo': [
    { id: 'realismo-temporal', nombre: 'Realismo temporal', desc: 'El tiempo es real e independiente.', color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)', colorBorder: 'rgba(96,165,250,0.25)' },
    { id: 'presentismo', nombre: 'Presentismo', desc: 'Solo existe el momento presente.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)' },
    { id: 'eternismo', nombre: 'Eternismo', desc: 'Pasado, presente y futuro coexisten.', color: '#34D399', colorBg: 'rgba(52,211,153,0.08)', colorBorder: 'rgba(52,211,153,0.25)' },
    { id: 'relacionismo', nombre: 'Relacionismo', desc: 'El tiempo es solo la transformación de las cosas.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)', colorBorder: 'rgba(251,146,60,0.25)' }
  ]
};

const PREGUNTAS_EXAMEN = [
  { texto: '¿Qué debes hacer al responder un argumento?', opciones: ['Ignorar', 'Citar fragmento', 'Resumir'], correcta: 1 },
  { texto: '¿Castigo por Ad Hominem (atacar a la persona)?', opciones: ['Advertencia', 'Silencio permanente'], correcta: 1 }
];

const state = {
  db: null, user: null, debateSlug: null, debateId: null, posturaId: null, posturaObj: null,
  cita: { id: null, texto: null }
};

// ── INICIALIZACIÓN ──
function safeInit() {
    const checkInterval = setInterval(() => {
        if (window.__ELO && typeof window.__ELO.getClient === 'function') {
            state.db = window.__ELO.getClient();
            if (state.db) {
                clearInterval(checkInterval);
                initDebate();
            }
        }
    }, 100);
}

async function initDebate() {
  const params = new URLSearchParams(window.location.search);
  state.debateSlug = params.get('id');
  state.debateId = DEBATE_UUID_MAP[state.debateSlug];

  if (!state.debateId) return;

  const { data: { user } } = await state.db.auth.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  state.user = user;

  const titulos = { 'debate-libre-albedrio': 'EL LIBRE ALBEDRÍO', 'debate-moral': 'LA MORAL', 'debate-conciencia': 'LA CONCIENCIA', 'debate-tiempo': 'EL TIEMPO' };
  const txt = titulos[state.debateSlug] || 'DEBATE';
  ['debate-titulo', 'debate-titulo-2'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
  });

  const { data: part } = await state.db.from('participantes_debate').select('*').eq('debate_id', state.debateId).eq('user_id', user.id).maybeSingle();

  if (part?.aprobado_reglamento) {
    state.posturaId = part.postura_id;
    state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => POSTURA_UUID_MAP[p.id] === part.postura_id);
    mostrarFaseDebate();
  } else {
    mostrarFase('fase-posturas');
    renderBurbujas();
  }
}

// ── FASE 1: BURBUJAS ──
function mostrarFase(faseId) {
  document.querySelectorAll('.debate-fase').forEach(f => f.classList.add('oculto'));
  document.getElementById(faseId).classList.remove('oculto');
}

function renderBurbujas() {
  const container = document.getElementById('debate-burbujas');
  const posturas = POSTURAS_CONFIG[state.debateSlug] || [];
  container.innerHTML = posturas.map(p => `
    <div class="debate-burbuja" onclick="seleccionarPostura('${p.id}')" id="burbuja-${p.id}" style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder}">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('') + `
    <div style="grid-column: 1/-1; display:flex; justify-content:center; margin-top:20px;">
        <button id="btn-confirmar" class="debate-confirmar-btn" disabled onclick="prepararExamen()">Esta es mi postura</button>
    </div>
  `;
}

function seleccionarPostura(id) {
  document.querySelectorAll('.debate-burbuja').forEach(b => b.classList.toggle('seleccionada', b.id === `burbuja-${id}`));
  state.posturaObj = POSTURAS_CONFIG[state.debateSlug].find(p => p.id === id);
  state.posturaId = POSTURA_UUID_MAP[id];
  document.getElementById('btn-confirmar').disabled = false;
}

// ── FASE 2: EXAMEN ──
function prepararExamen() {
  mostrarFase('fase-examen');
  const container = document.getElementById('examen-preguntas');
  container.innerHTML = PREGUNTAS_EXAMEN.map((p, i) => `
    <div class="pregunta-bloque" style="margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
      <p class="pregunta-texto" style="margin-bottom: 10px;">${i + 1}. ${p.texto}</p>
      <div class="opciones-grid" style="display: flex; flex-direction: column; gap: 8px;">
        ${p.opciones.map((o, oi) => `<label style="cursor:pointer;"><input type="radio" name="pregunta-${i}" value="${oi}"> <span>${o}</span></label>`).join('')}
      </div>
    </div>
  `).join('');
}

async function enviarExamen() {
  const nota = document.getElementById('examen-nota');
  const rtas = PREGUNTAS_EXAMEN.map((_, i) => document.querySelector(`input[name="pregunta-${i}"]:checked`)?.value);
  if (rtas.includes(undefined)) return nota.textContent = 'Responde todas las preguntas.';
  
  const correctas = rtas.filter((r, i) => parseInt(r) === PREGUNTAS_EXAMEN[i].correcta).length;
  if (correctas < 2) return nota.textContent = 'Respuestas incorrectas. Repasa el reglamento.';

  await state.db.from('participantes_debate').upsert({ debate_id: state.debateId, user_id: state.user.id, postura_id: state.posturaId, texto_inicial: state.posturaObj.desc, aprobado_reglamento: true });
  mostrarFaseDebate();
}

// ── FASE 3: CHAT ──
async function mostrarFaseDebate() {
  mostrarFase('fase-debate');
  document.getElementById('debate-tu-postura').innerHTML = `<div style="width:12px; height:12px; border-radius:50%; background:${state.posturaObj.color}; box-shadow: 0 0 10px ${state.posturaObj.color}"></div> <strong style="color:${state.posturaObj.color}; margin-left:8px;">${state.posturaObj.nombre}</strong>`;
  await cargarMensajes();
  state.db.channel(`debate-${state.debateId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mensajes_debate', filter: `debate_id=eq.${state.debateId}` }, () => cargarMensajes()).subscribe();
}

async function cargarMensajes() {
  const container = document.getElementById('debate-mensajes');
  const { data: mensajes } = await state.db.from('mensajes_debate').select('*, profiles(username, avatar_url)').eq('debate_id', state.debateId).is('responde_a', null).order('created_at', { ascending: true });
  
  if (!mensajes || mensajes.length === 0) return container.innerHTML = `<div style="text-align:center; color:gray;">Sé el primero en hablar.</div>`;
  container.innerHTML = mensajes.map(m => {
      const avatar = m.profiles?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${m.profiles?.username || 'User'}`;
      return `
      <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05);">
        <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 10px;">
          <img src="${avatar}" style="width:30px; height:30px; border-radius:50%;">
          <strong style="color:#fff;">${m.profiles?.username || 'Anónimo'}</strong>
        </div>
        ${m.cita ? `<p style="font-style:italic; border-left: 3px solid #C4A8E8; padding-left: 10px; color: #aaa; margin-bottom: 10px;">"${m.cita}"</p>` : ''}
        <p style="line-height: 1.5;">${m.contenido}</p>
        <button onclick="responderA('${m.id}', '${m.contenido.replace(/'/g, "\\'")}')" style="background:none; border:none; color:var(--accent); cursor:pointer; margin-top:10px;">Responder</button>
      </div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

async function enviarMensaje() {
  const input = document.getElementById('debate-input');
  const contenido = input.value.trim();
  if (!contenido) return;
  input.disabled = true;
  await state.db.from('mensajes_debate').insert({ debate_id: state.debateId, postura_id: state.posturaId, autor_id: state.user.id, contenido, cita: state.cita.texto, responde_a: state.cita.id });
  input.value = ''; quitarCita(); await cargarMensajes(); input.disabled = false;
}

function responderA(id, txt) { 
  state.cita = { id, texto: txt.substring(0, 80) + '...' }; 
  document.getElementById('debate-cita-texto').textContent = state.cita.texto; 
  document.getElementById('debate-cita-preview').style.display = 'flex'; 
}

function quitarCita() { 
  state.cita = { id: null, texto: null }; 
  document.getElementById('debate-cita-preview').style.display = 'none'; 
}

safeInit();