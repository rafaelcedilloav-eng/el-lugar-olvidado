/**
 * RAFA OS - Module: Debate Engine v2.9
 * Target: fase-posturas compatibility
 */

// ... (Manten tus DEBATE_UUID_MAP, POSTURA_UUID_MAP y POSTURAS_CONFIG igual) ...

// ── MOTOR DE INICIALIZACIÓN ──────────────────────────────────────────────────
async function initDebate() {
  const params = new URLSearchParams(window.location.search);
  state.debateSlug = params.get('id');
  state.debateId = DEBATE_UUID_MAP[state.debateSlug];

  if (!state.debateId) return console.error("[Rafa OS] Debate no mapeado.");

  const { data: { user } } = await state.db.auth.getUser();
  if (!user) return;
  state.user = user;

  const profile = await query(state.db.from('profiles').select('nivel').eq('id', user.id).maybeSingle());
  if (profile?.nivel === 0) return activarProtocoloBufon();

  // Títulos
  const titulos = { 
    'debate-libre-albedrio': 'El Libre Albedrío No Es Libertad', 
    'debate-moral': 'La Moral que Nadie Eligió', 
    'debate-conciencia': 'La Conciencia Como Base', 
    'debate-tiempo': 'El Tiempo No Existe' 
  };
  const txtTitulo = titulos[state.debateSlug] || state.debateSlug;
  ['debate-titulo', 'debate-titulo-2'].forEach(id => { 
    const el = document.getElementById(id);
    if (el) el.textContent = txtTitulo; 
  });

  const part = await query(state.db.from('participantes_debate').select('*').eq('debate_id', state.debateId).eq('user_id', user.id).maybeSingle());

  if (part?.aprobado_reglamento) {
    state.posturaId = part.postura_id;
    const config = POSTURAS_CONFIG[state.debateSlug] || [];
    state.posturaObj = config.find(p => POSTURA_UUID_MAP[p.id] === part.postura_id);
    mostrarFaseDebate();
  } else {
    // CAMBIO CLAVE: Usamos tu ID "fase-posturas"
    mostrarFase('fase-posturas'); 
    renderBurbujas();
  }
}

// ── RENDERIZADO DE BURBUJAS ──────────────────────────────────────────────────
function renderBurbujas() {
  // Buscamos el contenedor. Si no lo encuentra por ID, lo busca por clase.
  const container = document.getElementById('debate-burbujas') || document.querySelector('.debate-burbujas-grid');
  
  if (!container) {
    console.error("[Rafa OS] ERROR CRÍTICO: No se encontró el contenedor de burbujas en el HTML.");
    return;
  }
  
  const config = POSTURAS_CONFIG[state.debateSlug] || [];
  
  container.innerHTML = config.map(p => `
    <div class="debate-burbuja" onclick="seleccionarPostura('${p.id}')" id="burbuja-${p.id}" style="--color-burbuja:${p.colorBg};--color-burbuja-border:${p.colorBorder}">
      <div class="debate-burbuja-check">✓</div>
      <p class="debate-burbuja-desc">"${p.desc}"</p>
    </div>
  `).join('') + `
    <div class="debate-confirmar-wrap" style="grid-column: 1/-1; display: flex; justify-content: center; margin-top: 30px;">
      <button class="debate-confirmar-btn" id="btn-confirmar" onclick="prepararExamen()" disabled>Esta es mi postura</button>
    </div>`;
}

