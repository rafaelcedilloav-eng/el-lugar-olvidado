// ── Debate — El Lugar Olvidado

const DEBATE_UUID_MAP = {
  'debate-libre-albedrio': '0fd5b9a3-c8cb-459d-9e2f-e7791b8d21e1',
  'debate-moral':          '4cc14c5f-98a2-4e5d-b282-0dc07a56b5f5',
  'debate-conciencia': 'acaf7505-e33e-4ddc-9ea4-36363ce943f8',
  'debate-tiempo':         '3c228fcf-9c20-4c84-9648-3710b54e0d57'
};

const POSTURA_UUID_MAP = {
  'compatibilismo':    '2198f51a-f715-41ad-8d12-1ca79a1fe2c1',
  'determinismo':      '927985f5-aea1-4db7-bffa-6500f1cc9fe9',
  'escepticismo':      '91eefbeb-8d1e-49b8-8150-edc7ffdbf8c5',
  'libertarismo':      '7c07dca6-ec8d-4405-888e-37115eaea9ef',
  'eternismo':         '514d3bda-5931-461f-900a-1dcb5421eb09',
  'presentismo':       'ffa4df9a-d542-402d-94a3-0ff13fbf57ef',
  'realismo-temporal': '1d843715-b2ef-4bb7-b927-7e7961320e7f',
  'relacionismo':      '4c776c16-39c1-4953-9aa8-e6a0d4480dec',
  'construccionismo':  '819c04f5-0189-4602-b8b5-1c0cd1fcfcb9',
  'nihilismo-moral':   '77e1a30e-28a7-4d11-83a3-4fb7c7d77bde',
  'relativismo':       '63e21d61-1fb5-42f6-8dcb-300e6deba265',
  'universalismo':     'c60efb7e-05cb-4b08-a49f-b4379fbb603f',
  'dualismo':          'c19c4993-4469-44d5-8f9e-dbb79d2213a6',
  'idealismo':         'f1a0afee-f1e1-43ad-962d-0475efcf9eb6',
  'materialismo':      '36dd88a4-598d-4b35-b0ef-e62396699536',
  'panpsiquismo':      'ee9c9220-9e2d-4385-9b83-0c89c8b3f7f7'
};

const POSTURAS_CONFIG = {
  'debate-libre-albedrio': [
    { id: 'determinismo',    nombre: 'Determinismo',            desc: 'Nuestras decisiones son producto de causas previas, no de libertad real.',      color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)',   colorBorder: 'rgba(96,165,250,0.25)',   colorShadow: 'rgba(96,165,250,0.12)'  },
    { id: 'compatibilismo',  nombre: 'Compatibilismo',          desc: 'La libertad y el determinismo pueden coexistir sin contradicción.',              color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'libertarismo',    nombre: 'Libertarismo filosófico', desc: 'Somos genuinamente libres más allá de las causas que nos precedieron.',          color: '#34D399', colorBg: 'rgba(52,211,153,0.08)',  colorBorder: 'rgba(52,211,153,0.25)',  colorShadow: 'rgba(52,211,153,0.12)'  },
    { id: 'escepticismo',    nombre: 'Escepticismo',            desc: 'El libre albedrío es una ilusión útil que el sistema necesita para funcionar.',  color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)',  colorBorder: 'rgba(251,146,60,0.25)',  colorShadow: 'rgba(251,146,60,0.12)'  }
  ],
  'debate-moral': [
    { id: 'relativismo',      nombre: 'Relativismo',      desc: 'La moral es cultural y contextual, no existe una moral universal válida.',      color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)',   colorBorder: 'rgba(96,165,250,0.25)',   colorShadow: 'rgba(96,165,250,0.12)'  },
    { id: 'universalismo',    nombre: 'Universalismo',    desc: 'Existen principios morales válidos para toda la humanidad, en todo tiempo.',    color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'construccionismo', nombre: 'Construccionismo', desc: 'La moral se construye colectivamente, no se hereda ni se descubre.',            color: '#34D399', colorBg: 'rgba(52,211,153,0.08)',  colorBorder: 'rgba(52,211,153,0.25)',  colorShadow: 'rgba(52,211,153,0.12)'  },
    { id: 'nihilismo-moral',  nombre: 'Nihilismo moral',  desc: 'La moral no tiene fundamento objetivo. Todo juicio moral es una proyección.',  color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)',  colorBorder: 'rgba(251,146,60,0.25)',  colorShadow: 'rgba(251,146,60,0.12)'  }
  ],
  'debate-conciencia': [
    { id: 'materialismo', nombre: 'Materialismo', desc: 'La conciencia es producto del cerebro y la materia. Nada más existe.',           color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)',   colorBorder: 'rgba(96,165,250,0.25)',   colorShadow: 'rgba(96,165,250,0.12)'  },
    { id: 'panpsiquismo', nombre: 'Panpsiquismo', desc: 'La conciencia es una propiedad fundamental del universo, no solo del cerebro.',  color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'dualismo',     nombre: 'Dualismo',     desc: 'Mente y materia son realidades distintas que no se reducen la una a la otra.',   color: '#34D399', colorBg: 'rgba(52,211,153,0.08)',  colorBorder: 'rgba(52,211,153,0.25)',  colorShadow: 'rgba(52,211,153,0.12)'  },
    { id: 'idealismo',    nombre: 'Idealismo',    desc: 'La conciencia precede y genera la materia. La realidad es mental en su origen.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)',  colorBorder: 'rgba(251,146,60,0.25)',  colorShadow: 'rgba(251,146,60,0.12)'  }
  ],
  'debate-tiempo': [
    { id: 'realismo-temporal', nombre: 'Realismo temporal', desc: 'El tiempo es real e independiente de nuestra percepción o experiencia.',        color: '#60A5FA', colorBg: 'rgba(96,165,250,0.08)',   colorBorder: 'rgba(96,165,250,0.25)',   colorShadow: 'rgba(96,165,250,0.12)'  },
    { id: 'presentismo',       nombre: 'Presentismo',       desc: 'Solo existe el momento presente. Pasado y futuro son construcciones mentales.', color: '#C4A8E8', colorBg: 'rgba(196,168,232,0.08)', colorBorder: 'rgba(196,168,232,0.25)', colorShadow: 'rgba(196,168,232,0.12)' },
    { id: 'eternismo',         nombre: 'Eternismo',         desc: 'Pasado, presente y futuro coexisten simultáneamente en un bloque temporal.',    color: '#34D399', colorBg: 'rgba(52,211,153,0.08)',  colorBorder: 'rgba(52,211,153,0.25)',  colorShadow: 'rgba(52,211,153,0.12)'  },
    { id: 'relacionismo',      nombre: 'Relacionismo',      desc: 'El tiempo no existe como entidad. Solo existe la transformación de las cosas.', color: '#FB923C', colorBg: 'rgba(251,146,60,0.08)',  colorBorder: 'rgba(251,146,60,0.25)',  colorShadow: 'rgba(251,146,60,0.12)'  }
  ]
};

const NIVELES_ICONOS = ['🎭','🕯️','📖','⚡','🏛️','🔥','🪶','⚗️','🌀','👁️','🜂'];

const PREGUNTAS_EXAMEN = [
  {
    texto: '¿Qué debes hacer al responder el argumento de otro participante?',
    opciones: ['Ignorar lo que dijo y expresar tu opinión', 'Citar el fragmento específico al que respondes', 'Resumir todo su mensaje', 'Preguntarle si está seguro'],
    correcta: 1
  },
  {
    texto: '¿Cuántas infracciones por lenguaje irrespetuoso resultan en mute permanente?',
    opciones: ['2', '3', '4', '5'],
    correcta: 2
  },
  {
    texto: 'Si deseas cambiar de postura, ¿qué debes hacer?',
    opciones: ['Simplemente seleccionar otra', 'Escribir una explicación de al menos 200 caracteres', 'Pedirle permiso al Fundador', 'Esperar 24 horas'],
    correcta: 1
  },
  {
    texto: '¿Cuál es el propósito principal de este debate?',
    opciones: ['Ganar a toda costa', 'Demostrar que los demás están equivocados', 'Defender y refinar una postura con argumentos genuinos', 'Acumular más mensajes que los demás'],
    correcta: 2
  },
  {
    texto: '¿Qué ocurre si 3 participantes consecutivos de un mismo lado no responden en su turno?',
    opciones: ['Se pausa el debate', 'Se declara victoria para la postura contraria', 'Se reinicia el turno', 'Nada, el debate continúa'],
    correcta: 1
  }
];

// ── ESTADO ────────────────────────────────────────────────────────────────────
let debateId          = null;
let debateSlug        = null;
let debateTitulo      = '';
let posturaSeleccionada = null;
let posturaIdSupabase   = null;
let userId            = null;
let nivelUsuario      = 1;
let citaActiva        = null;
let respondiendoA     = null;

// ── INIT ──────────────────────────────────────────────────────────────────────
async function initDebate() {
  const params = new URLSearchParams(window.location.search);
  debateSlug = params.get('id');
  debateId   = DEBATE_UUID_MAP[debateSlug] || null;

  if (!debateSlug || !POSTURAS_CONFIG[debateSlug] || !debateId) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Georgia;color:rgba(240,234,214,0.4);font-style:italic;">Debate no encontrado.</div>';
    return;
  }

  const db = window.__ELO.getClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return;
  userId = user.id;

  const { data: profile } = await db.from('profiles').select('nivel').eq('id', user.id).single();
  nivelUsuario = profile?.nivel || 1;

  const titulos = {
    'debate-libre-albedrio': 'El Libre Albedrío No Es Libertad — Es un Costo',
    'debate-moral':          'La Moral que Nadie Eligió',
    'debate-conciencia':     'La Conciencia Como Base del Universo',
    'debate-tiempo':         'El Tiempo No Existe — Solo la Transformación'
  };
  debateTitulo = titulos[debateSlug] || debateSlug;

  document.getElementById('debate-titulo').textContent   = debateTitulo;
  document.getElementById('debate-titulo-2').textContent = debateTitulo;

  // Verificar si ya participó
  const { data: participante } = await db
    .from('participantes_debate')
    .select('*')
    .eq('debate_id', debateId)
    .eq('user_id', user.id)
    .single();

  if (participante?.aprobado_reglamento) {
    posturaIdSupabase   = participante.postura_id;
    posturaSeleccionada = POSTURAS_CONFIG[debateSlug].find(p => POSTURA_UUID_MAP[p.id] === participante.postura_id);
    mostrarFaseDebate();
    return;
  }

  renderBurbujas();
}

// ── RENDER BURBUJAS ───────────────────────────────────────────────────────────
function renderBurbujas() {
  const posturas   = POSTURAS_CONFIG[debateSlug];
  const contenedor = document.getElementById('debate-burbujas');

  contenedor.innerHTML = posturas.map(p => `
    <div class="debate-burbuja" id="burbuja-${p.id}"
      style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder};--color-burbuja-shadow:${p.colorShadow}"
      onclick="seleccionarPostura('${p.id}')">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('');

  const wrap = document.createElement('div');
  wrap.className = 'debate-confirmar-wrap';
  wrap.style.gridColumn = '1 / -1';
  wrap.innerHTML = `<button class="debate-confirmar-btn" id="btn-confirmar" onclick="confirmarPostura()" disabled>Esta es mi postura</button>`;
  contenedor.appendChild(wrap);
}

// ── SELECCIONAR POSTURA ───────────────────────────────────────────────────────
function seleccionarPostura(id) {
  document.querySelectorAll('.debate-burbuja').forEach(b => b.classList.remove('seleccionada'));
  document.getElementById(`burbuja-${id}`).classList.add('seleccionada');
  posturaSeleccionada = POSTURAS_CONFIG[debateSlug].find(p => p.id === id);
  posturaIdSupabase   = POSTURA_UUID_MAP[id] || null;
  document.getElementById('btn-confirmar').disabled = false;
}

function confirmarPostura() {
  if (!posturaSeleccionada) return;
  mostrarFase('fase-examen');
  renderExamen();
}

// ── RENDER EXAMEN ─────────────────────────────────────────────────────────────
function renderExamen() {
  const contenedor = document.getElementById('examen-preguntas');
  contenedor.innerHTML = PREGUNTAS_EXAMEN.map((p, i) => `
    <div class="examen-pregunta">
      <p class="examen-pregunta-texto">${i + 1}. ${p.texto}</p>
      <div class="examen-opciones">
        ${p.opciones.map((o, j) => `
          <label class="examen-opcion">
            <input type="radio" name="pregunta-${i}" value="${j}">
            ${o}
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ── ENVIAR EXAMEN ─────────────────────────────────────────────────────────────
async function enviarExamen() {
  const nota = document.getElementById('examen-nota');
  let correctas = 0;

  for (let i = 0; i < PREGUNTAS_EXAMEN.length; i++) {
    const sel = document.querySelector(`input[name="pregunta-${i}"]:checked`);
    if (!sel) { nota.textContent = 'Responde todas las preguntas antes de continuar.'; return; }
    if (parseInt(sel.value) === PREGUNTAS_EXAMEN[i].correcta) correctas++;
  }

  if (correctas < 4) {
    nota.textContent = `${correctas}/5 correctas. Necesitas al menos 4. Intenta de nuevo.`;
    return;
  }

  const db = window.__ELO.getClient();

  const { error } = await db.from('participantes_debate').upsert({
    debate_id:           debateId,
    user_id:             userId,
    postura_id:          posturaIdSupabase,
    texto_inicial:       posturaSeleccionada.desc,
    aprobado_reglamento: true
  });

  if (error) { nota.textContent = 'Error al registrar. Intenta de nuevo.'; return; }

  nota.textContent = '✦ Aprobado. Entrando al debate...';
  setTimeout(() => mostrarFaseDebate(), 1000);
}

// ── MODO ESPECTADOR ───────────────────────────────────────────────────────────
function entrarComoEspectador() {
  mostrarFase('fase-debate');
  document.getElementById('debate-input-wrap').style.display = 'none';
  document.getElementById('debate-tu-postura').innerHTML = `
    <span style="font-size:0.78rem;color:rgba(240,234,214,0.3);font-family:system-ui">Modo espectador</span>
  `;
  document.getElementById('debate-titulo-2').textContent = debateTitulo;
  renderPosturasBar();
  cargarMensajes();
  suscribirMensajes();
}

// ── MOSTRAR FASE DEBATE ───────────────────────────────────────────────────────
async function mostrarFaseDebate() {
  mostrarFase('fase-debate');

  const tuPostura = posturaSeleccionada || POSTURAS_CONFIG[debateSlug][0];
  document.getElementById('debate-tu-postura').innerHTML = `
    <div class="debate-tu-postura-dot" style="background:${tuPostura.color}"></div>
    Tu postura: <strong style="color:${tuPostura.color}">${tuPostura.nombre}</strong>
  `;

  renderPosturasBar();
  await cargarMensajes();
  suscribirMensajes();
}

// ── RENDER POSTURAS BAR ───────────────────────────────────────────────────────
async function renderPosturasBar() {
  const db       = window.__ELO.getClient();
  const posturas = POSTURAS_CONFIG[debateSlug];
  const bar      = document.getElementById('debate-posturas-bar');

  const chips = await Promise.all(posturas.map(async p => {
    const uuid = POSTURA_UUID_MAP[p.id];
    const { count } = await db
      .from('participantes_debate')
      .select('*', { count: 'exact', head: true })
      .eq('debate_id', debateId)
      .eq('postura_id', uuid);
    return `
      <div class="debate-postura-chip" style="border-color:${p.colorBorder};color:${p.color}">
        <div class="debate-postura-chip-dot" style="background:${p.color}"></div>
        ${p.nombre} · ${count || 0}
      </div>
    `;
  }));

  bar.innerHTML = chips.join('');
}

// ── CARGAR MENSAJES ───────────────────────────────────────────────────────────
async function cargarMensajes() {
    console.log('debateId:', debateId, 'debateSlug:', debateSlug);
  const db = window.__ELO.getClient();

  const { data: mensajes } = await db
    .from('mensajes_debate')
    .select('*, profiles(username, avatar_url, nivel)')
    .eq('debate_id', debateId)
    .is('responde_a', null)
    .order('created_at', { ascending: true });

  const contenedor = document.getElementById('debate-mensajes');

  if (!mensajes || mensajes.length === 0) {
    contenedor.innerHTML = `<div class="debate-vacio">Sé el primero en abrir el debate.</div>`;
    return;
  }

  const htmls = await Promise.all(mensajes.map(m => renderMensaje(m, false)));
  contenedor.innerHTML = htmls.join('');
}

// ── RENDER MENSAJE ────────────────────────────────────────────────────────────
async function renderMensaje(m, esRespuesta) {
  const db     = window.__ELO.getClient();
  const nivel  = m.profiles?.nivel || 1;
  const icono  = NIVELES_ICONOS[nivel] || '🕯️';
  const nombre = m.profiles?.username || 'Anónimo';
  const avatar = m.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=2D1F3D&color=C4A8E8`;
  const fecha  = new Date(m.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  const postura = POSTURAS_CONFIG[debateSlug]?.find(p => POSTURA_UUID_MAP[p.id] === m.postura_id);

  let respuestasHtml = '';
  if (!esRespuesta) {
    const { data: respuestas } = await db
      .from('mensajes_debate')
      .select('*, profiles(username, avatar_url, nivel)')
      .eq('responde_a', m.id)
      .order('created_at', { ascending: true });

    if (respuestas?.length) {
      const htmlsResp = await Promise.all(respuestas.map(r => renderMensaje(r, true)));
      respuestasHtml = `<div class="debate-respuestas">${htmlsResp.join('')}</div>`;
    }
  }

  return `
    <div class="debate-mensaje" id="msg-${m.id}">
      <div class="debate-mensaje-header">
        <img class="debate-mensaje-avatar" src="${avatar}" alt="${nombre}">
        <span class="debate-mensaje-insignia">${icono}</span>
        <span class="debate-mensaje-nombre" ${postura ? `style="color:${postura.color}"` : ''}>${nombre}</span>
        <span class="debate-mensaje-fecha">${fecha}</span>
      </div>
      ${m.cita ? `<p class="debate-mensaje-cita">"${m.cita}"</p>` : ''}
      <p class="debate-mensaje-contenido">${m.contenido}</p>
      <div class="debate-mensaje-acciones">
        ${!esRespuesta ? `<button class="debate-mensaje-btn" onclick="responderA('${m.id}', \`${escapeStr(m.contenido)}\`)">Responder</button>` : ''}
      </div>
    </div>
    ${respuestasHtml}
  `;
}

// ── RESPONDER ─────────────────────────────────────────────────────────────────
function responderA(msgId, contenido) {
  respondiendoA = msgId;
  const extracto = contenido.length > 80 ? contenido.substring(0, 80) + '...' : contenido;
  setCita(extracto);
  document.getElementById('debate-input').focus();
}

function setCita(texto) {
  citaActiva = texto;
  document.getElementById('debate-cita-texto').textContent = texto;
  document.getElementById('debate-cita-preview').style.display = 'flex';
}

function quitarCita() {
  citaActiva    = null;
  respondiendoA = null;
  document.getElementById('debate-cita-preview').style.display = 'none';
  document.getElementById('debate-cita-texto').textContent = '';
}

document.addEventListener('mouseup', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return;
  const texto = sel.toString().trim();
  if (texto.length < 10) return;
  const range = sel.getRangeAt(0);
  const nodo  = range.commonAncestorContainer;
  if (nodo.nodeType === Node.TEXT_NODE && nodo.parentElement.closest('.debate-mensaje-contenido')) {
    setCita(texto.length > 120 ? texto.substring(0, 120) + '...' : texto);
  }
});

// ── ENVIAR MENSAJE ────────────────────────────────────────────────────────────
async function enviarMensaje() {
  const input    = document.getElementById('debate-input');
  const contenido = input.value.trim();
  if (!contenido) return;

  const db = window.__ELO.getClient();

  const { data: { user: currentUser } } = await db.auth.getUser();
if (!currentUser) return;

  const { error } = await db.from('mensajes_debate').insert({
    debate_id:  debateId,
    postura_id: posturaIdSupabase,
    user_id:    userId,
    contenido,
    cita:       citaActiva || null,
    responde_a: respondiendoA || null,
    tipo:       'debate'
  });

  if (error) { console.error('Error enviando mensaje:', error); return; }

  input.value = '';
  quitarCita();
  respondiendoA = null;
}

// ── REALTIME ──────────────────────────────────────────────────────────────────
function suscribirMensajes() {
  const db = window.__ELO.getClient();
  db.channel(`debate-${debateId}`)
    .on('postgres_changes', {
      event:  'INSERT',
      schema: 'public',
      table:  'mensajes_debate',
      filter: `debate_id=eq.${debateId}`
    }, () => cargarMensajes())
    .subscribe();
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function mostrarFase(faseId) {
  document.querySelectorAll('.debate-fase').forEach(f => f.classList.add('oculto'));
  document.getElementById(faseId).classList.remove('oculto');
}

function escapeStr(str) {
  return str.replace(/`/g, "'").replace(/\\/g, '').substring(0, 80);
}

document.addEventListener('DOMContentLoaded', initDebate);