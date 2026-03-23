// ── Perfil — El Lugar Olvidado

const NIVELES = [
  { nivel: 0,  nombre: 'El Bufón',      icono: '🎭', desc: '"Creyó que el camino se podía saltar. El lugar tiene memoria."' },
  { nivel: 1,  nombre: 'El Curioso',    icono: '🕯️', desc: '"Toda búsqueda comienza con una pregunta"' },
  { nivel: 2,  nombre: 'El Pensador',   icono: '📖', desc: '"Pensar en voz alta es el primer acto de valentía"' },
  { nivel: 3,  nombre: 'El Debatiente', icono: '⚡', desc: '"Las ideas que generan fricción son las que cambian mentes"' },
  { nivel: 4,  nombre: 'El Filósofo',   icono: '🏛️', desc: '"No busca respuestas — construye mejores preguntas"' },
  { nivel: 5,  nombre: 'El Guardián',   icono: '🔥', desc: '"El conocimiento que no se comparte se extingue"' },
  { nivel: 6,  nombre: 'El Mensajero',  icono: '🪶', desc: '"Abre las puertas del lugar a quienes aún no saben que lo buscan"' },
  { nivel: 7,  nombre: 'El Alquimista', icono: '⚗️', desc: '"Transforma ideas en algo que el mundo no había visto"' },
  { nivel: 8,  nombre: 'El Oráculo',    icono: '🌀', desc: '"Sus palabras abren puertas que otros no ven"' },
  { nivel: 9,  nombre: 'Voz del Lugar', icono: '👁️', desc: '"Elegido por el fundador como voz esencial del foro"' },
  { nivel: 10, nombre: 'El Fundador',   icono: '🜂', desc: '"Creó el lugar donde las preguntas importan más que las respuestas"' }
];

const EDGE_URL = 'https://vvexfxjizczurnmubqxo.supabase.co/functions/v1/subir-nivel';

// ── SUBIR NIVEL VÍA EDGE FUNCTION ─────────────────────────────────────────────
async function solicitarSubidaNivel(nivelSolicitado) {
  const db = window.__ELO.getClient();
  const { data: { session } } = await db.auth.getSession();
  if (!session) return;

  try {
    const res = await fetch(EDGE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nivel_solicitado: nivelSolicitado })
    });

    const data = await res.json();

    if (data.resultado === 'subida') {
      window.mostrarInsignia(data.nivel_nuevo);
    } else if (data.resultado === 'bufon') {
      window.mostrarInsignia(0);
    }
    // 'pendiente' — no hacer nada, el usuario aún no cumple requisitos

  } catch (err) {
    console.error('Error al solicitar subida de nivel:', err);
  }
}

// ── INIT ──────────────────────────────────────────────────────────────────────
async function initPerfil() {
  const db = window.__ELO.getClient();
  const { data: { user } } = await db.auth.getUser();

  if (!user) {
    window.location.href = '/el-lugar-olvidado/login.html';
    return;
  }

  let { data: profile } = await db
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get('ref') || localStorage.getItem('ref_id');

    const { data: newProfile } = await db
      .from('profiles')
      .insert({
        id: user.id,
        username: user.user_metadata?.full_name || user.email,
        avatar_url: user.user_metadata?.avatar_url || '',
        nivel: 1,
        referido_por: refId || null
      })
      .select()
      .single();

    if (refId) {
      await db.from('referidos').insert({
        referidor_id: refId,
        referido_id: user.id
      });
      localStorage.removeItem('ref_id');
    }

    profile = newProfile;
  }

  renderPerfil(user, profile);
  cargarNotificaciones(user.id);
  cargarReferidos(user.id, profile);
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function renderPerfil(user, profile) {
  const nivel = profile?.nivel ?? 1;
  const nivelData = NIVELES[nivel] || NIVELES[1];

  if (nivel === 1 && !localStorage.getItem('insignia_1_mostrada')) {
    setTimeout(() => window.mostrarInsignia(1), 1500);
    localStorage.setItem('insignia_1_mostrada', 'true');
  }

  const avatar = document.getElementById('perfil-avatar');
  if (avatar) {
    avatar.src = user.user_metadata?.avatar_url ||
      'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.user_metadata?.full_name || 'U') + '&background=2D1F3D&color=C4A8E8';
  }

  document.getElementById('perfil-nombre').textContent = user.user_metadata?.full_name || user.email;
  document.getElementById('perfil-email').textContent = user.email;
  document.getElementById('perfil-nivel-nombre').textContent = nivelData.nombre;
  document.getElementById('perfil-nivel-desc').textContent = nivelData.desc;
  document.getElementById('perfil-nivel-icono').textContent = nivelData.icono;
  document.getElementById('stat-nivel').textContent = nivel === 0 ? '🎭' : nivel;

  document.querySelectorAll('.insignia').forEach(el => {
    const nivelInsignia = parseInt(el.dataset.nivel);
    if (nivelInsignia <= nivel && nivel > 0) {
      el.classList.remove('bloqueada');
      el.classList.add('activa');
    }
  });

  const refLink = `https://rafaelcedilloav-eng.github.io/el-lugar-olvidado/login.html?ref=${user.id}`;
  document.getElementById('referido-link').value = refLink;
}

// ── REFERIDOS ─────────────────────────────────────────────────────────────────
async function cargarReferidos(userId, profile) {
  const db = window.__ELO.getClient();

  const { data: referidos } = await db
    .from('referidos')
    .select('*')
    .eq('referidor_id', userId);

  const total = referidos?.length || 0;
  document.getElementById('stat-referidos').textContent = total;

  // Verificar subida de nivel vía Edge Function
  if (profile?.nivel > 0 && profile?.nivel < 9) {
    const nivelSiguiente = profile.nivel + 1;
    await solicitarSubidaNivel(nivelSiguiente);
  }
}

// ── NOTIFICACIONES ────────────────────────────────────────────────────────────
async function cargarNotificaciones(userId) {
  const db = window.__ELO.getClient();

  const { data: notifs } = await db
    .from('notificaciones')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  const lista = document.getElementById('notificaciones-lista');
  const badge = document.getElementById('notif-badge');

  if (!notifs || notifs.length === 0) {
    lista.innerHTML = '<p class="perfil-empty">Sin notificaciones por ahora.</p>';
    return;
  }

  const noLeidas = notifs.filter(n => !n.leida).length;
  if (noLeidas > 0) badge.textContent = noLeidas;

  lista.innerHTML = notifs.map(n => `
    <div class="notif-item ${!n.leida ? 'no-leida' : ''}" onclick="marcarLeida('${n.id}', this)">
      <span class="notif-icono">${n.tipo === 'nivel' ? '🏆' : n.tipo === 'respuesta' ? '💬' : '🔔'}</span>
      <span class="notif-mensaje">${n.mensaje}</span>
      <span class="notif-fecha">${new Date(n.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
    </div>
  `).join('');

  db.channel('notificaciones')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notificaciones',
      filter: `user_id=eq.${userId}`
    }, () => cargarNotificaciones(userId))
    .subscribe();
}

async function marcarLeida(id, el) {
  const db = window.__ELO.getClient();
  await db.from('notificaciones').update({ leida: true }).eq('id', id);
  el.classList.remove('no-leida');
}

function copiarLink() {
  const input = document.getElementById('referido-link');
  navigator.clipboard.writeText(input.value);
  const msg = document.getElementById('referido-copiado');
  msg.classList.add('visible');
  setTimeout(() => msg.classList.remove('visible'), 2000);
}

const urlParams = new URLSearchParams(window.location.search);
const refId = urlParams.get('ref');
if (refId) localStorage.setItem('ref_id', refId);

document.addEventListener('DOMContentLoaded', initPerfil);