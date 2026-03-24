// ── Foro — El Lugar Olvidado

// Debates de ensayos predefinidos — uno por ensayo publicado
const DEBATES_ENSAYOS = [
  {
    id: 'debate-libre-albedrio',
    ensayo_id: 'el-libre-albedrio',
    titulo: 'El Libre Albedrío No Es Libertad — Es un Costo',
    descripcion: '¿Elegimos realmente o simplemente ejecutamos lo que el sistema nos dejó elegir?',
    categoria: 'Filosofía',
    url: 'debate.html?id=debate-libre-albedrio'
  },
  {
    id: 'debate-moral',
    ensayo_id: 'la-moral-que-nadie-eligio',
    titulo: 'La Moral que Nadie Eligió',
    descripcion: '¿Puede ser legítima una moral que nos fue impuesta antes de que pudiéramos cuestionarla?',
    categoria: 'Filosofía',
    url: 'debate.html?id=debate-moral'
  },
  {
    id: 'debate-conciencia',
    ensayo_id: 'la-conciencia-como-base',
    titulo: 'La Conciencia Como Base del Universo',
    descripcion: '¿Es la conciencia un producto de la materia o su fundamento?',
    categoria: 'Metafísica',
    url: 'debate.html?id=debate-conciencia'
  },
  {
    id: 'debate-tiempo',
    ensayo_id: 'el-tiempo-no-existe',
    titulo: 'El Tiempo No Existe — Solo la Transformación',
    descripcion: '¿Qué queda de nuestra experiencia si el tiempo es solo una ilusión cognitiva?',
    categoria: 'Cosmología',
    url: 'debate.html?id=debate-tiempo'
  }
];

const COLORES_CATEGORIA = {
  'Filosofía': '#8B6FBE',
  'Metafísica': '#22D3EE',
  'Teología': '#E8A020',
  'Cosmología': '#F87171'
};

let nivelUsuario = 0;

// ── INIT ─────────────────────────────────────────────────────────────────────
async function initForo() {
  const db = window.__ELO.getClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return;

  // Obtener nivel del usuario
  const { data: profile } = await db
    .from('profiles')
    .select('nivel')
    .eq('id', user.id)
    .single();

  nivelUsuario = profile?.nivel || 1;

  // Mostrar botón proponer si nivel >= 8
  if (nivelUsuario >= 8) {
    document.getElementById('foro-proponer-wrap').style.display = 'flex';
  }

  renderDebatesEnsayos();
  await cargarDebatesIndependientes();
}

// ── RENDER DEBATES DE ENSAYOS ────────────────────────────────────────────────
async function renderDebatesEnsayos() {
  const db = window.__ELO.getClient();
  const contenedor = document.getElementById('debates-ensayos');

  // Contar comentarios por debate
  const conteos = {};
  for (const d of DEBATES_ENSAYOS) {
    const { count } = await db
      .from('comentarios')
      .select('*', { count: 'exact', head: true })
      .eq('debate_id', d.id);
    conteos[d.id] = count || 0;
  }

  contenedor.innerHTML = DEBATES_ENSAYOS.map(d => `
    <a href="${d.url}" class="foro-debate-card">
      <div class="foro-debate-meta">
        <span class="foro-debate-categoria" style="color:${COLORES_CATEGORIA[d.categoria] || '#C4A8E8'}">
          ${d.categoria}
        </span>
        <span>·</span>
        <span>Debate de ensayo</span>
      </div>
      <p class="foro-debate-titulo">${d.titulo}</p>
      <p class="foro-debate-desc">${d.descripcion}</p>
      <div class="foro-debate-footer">
        <span>💬 ${conteos[d.id]} comentarios</span>
      </div>
    </a>
  `).join('');
}

// ── CARGAR DEBATES INDEPENDIENTES ────────────────────────────────────────────
async function cargarDebatesIndependientes() {
  const db = window.__ELO.getClient();
  const contenedor = document.getElementById('debates-independientes');

  const { data: debates, error } = await db
    .from('debates')
    .select('*')
    .eq('tipo', 'independiente')
    .eq('estado', 'publicado')
    .order('created_at', { ascending: false });

  if (error || !debates || debates.length === 0) {
    contenedor.innerHTML = `
      <div class="foro-vacio">
        <p>Aún no hay temas independientes publicados.</p>
        ${nivelUsuario >= 8 ? '<p style="margin-top:0.5rem;font-size:0.8rem">Puedes proponer uno con el botón de arriba.</p>' : ''}
      </div>
    `;
    return;
  }

  // Contar comentarios
  const conteos = {};
  for (const d of debates) {
    const { count } = await db
      .from('comentarios')
      .select('*', { count: 'exact', head: true })
      .eq('debate_id', d.id);
    conteos[d.id] = count || 0;
  }

  contenedor.innerHTML = debates.map(d => `
    <a href="debates/debate-${d.id}.html" class="foro-debate-card">
      <div class="foro-debate-meta">
        <span>Tema independiente</span>
      </div>
      <p class="foro-debate-titulo">${d.titulo}</p>
      ${d.descripcion ? `<p class="foro-debate-desc">${d.descripcion}</p>` : ''}
      <div class="foro-debate-footer">
        <span>💬 ${conteos[d.id]} comentarios</span>
        <span>· ${new Date(d.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
    </a>
  `).join('');
}

// ── TABS ─────────────────────────────────────────────────────────────────────
function cambiarTab(tab) {
  document.querySelectorAll('.foro-tab').forEach(t => t.classList.remove('activo'));
  document.querySelectorAll('.foro-panel').forEach(p => p.classList.remove('activo'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('activo');
  document.getElementById(`panel-${tab}`).classList.add('activo');
}

// ── MODAL PROPUESTA ───────────────────────────────────────────────────────────
function abrirModalPropuesta() {
  document.getElementById('modal-propuesta').style.display = 'flex';
  document.getElementById('propuesta-titulo').focus();
}

function cerrarModalPropuesta() {
  document.getElementById('modal-propuesta').style.display = 'none';
  document.getElementById('propuesta-titulo').value = '';
  document.getElementById('propuesta-descripcion').value = '';
  document.getElementById('propuesta-nota').textContent = '';
}

async function enviarPropuesta() {
  const titulo = document.getElementById('propuesta-titulo').value.trim();
  const descripcion = document.getElementById('propuesta-descripcion').value.trim();
  const nota = document.getElementById('propuesta-nota');
  const btn = document.getElementById('btn-enviar-propuesta');

  if (!titulo) {
    nota.textContent = 'El título es obligatorio.';
    return;
  }

  btn.disabled = true;
  nota.textContent = 'Enviando...';

  const db = window.__ELO.getClient();
  const { data: { user } } = await db.auth.getUser();

  // Nivel 10 publica directo, niveles 8-9 envían como propuesta
  const estado = nivelUsuario >= 10 ? 'publicado' : 'propuesta';

  const { error } = await db.from('debates').insert({
    titulo,
    descripcion,
    tipo: 'independiente',
    estado,
    autor_id: user.id
  });

  btn.disabled = false;

  if (error) {
    nota.textContent = 'Error al enviar. Intenta de nuevo.';
    return;
  }

  if (estado === 'publicado') {
    nota.textContent = '✦ Debate publicado.';
    setTimeout(() => {
      cerrarModalPropuesta();
      cargarDebatesIndependientes();
    }, 1200);
  } else {
    nota.textContent = '✦ Propuesta enviada. El Fundador la revisará.';

    // Notificar al Fundador (nivel 10) — insertar notificación vía admin
    // Esto se maneja en la Edge Function notificar-fundador
    await notificarFundador(titulo, descripcion, user.id);

    setTimeout(() => cerrarModalPropuesta(), 2000);
  }
}

// ── NOTIFICAR AL FUNDADOR ─────────────────────────────────────────────────────
async function notificarFundador(titulo, descripcion, autorId) {
  const db = window.__ELO.getClient();
  const { data: { session } } = await db.auth.getSession();
  if (!session) return;

  try {
    await fetch('https://vvexfxjizczurnmubqxo.supabase.co/functions/v1/notificar-fundador', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, descripcion, autor_id: autorId })
    });
  } catch (e) {
    console.error('Error notificando al fundador:', e);
  }
}

// Cerrar modal al hacer click fuera
document.getElementById('modal-propuesta').addEventListener('click', function(e) {
  if (e.target === this) cerrarModalPropuesta();
});

document.addEventListener('DOMContentLoaded', initForo);