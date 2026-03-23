// ── Sistema de Insignias — El Lugar Olvidado

const INSIGNIAS_CONFIG = {
  1: {
    nombre: 'El Curioso',
    icono: '🕯️',
    desc: 'Toda búsqueda comienza con una pregunta',
    color: '#F5E6C8',
    colorSecundario: '#C8A96E',
    particulas: 'luz',
    animacion: 'vela'
  },
  2: {
    nombre: 'El Pensador',
    icono: '📖',
    desc: 'Pensar en voz alta es el primer acto de valentía',
    color: '#E8D5A3',
    colorSecundario: '#B8964E',
    particulas: 'paginas',
    animacion: 'libro'
  },
  3: {
    nombre: 'El Debatiente',
    icono: '⚡',
    desc: 'Las ideas que generan fricción son las que cambian mentes',
    color: '#60A5FA',
    colorSecundario: '#1D4ED8',
    particulas: 'rayos',
    animacion: 'electrico'
  },
  4: {
    nombre: 'El Filósofo',
    icono: '🏛️',
    desc: 'No busca respuestas — construye mejores preguntas',
    color: '#C4A8E8',
    colorSecundario: '#6D28D9',
    particulas: 'piedra',
    animacion: 'pilares'
  },
  5: {
    nombre: 'El Guardián',
    icono: '🔥',
    desc: 'El conocimiento que no se comparte se extingue',
    color: '#FB923C',
    colorSecundario: '#EA580C',
    particulas: 'fuego',
    animacion: 'llamas'
  },
  6: {
    nombre: 'El Mensajero',
    icono: '🪶',
    desc: 'Abre las puertas del lugar a quienes aún no saben que lo buscan',
    color: '#E2E8F0',
    colorSecundario: '#94A3B8',
    particulas: 'pluma',
    animacion: 'flotar'
  },
  7: {
    nombre: 'El Alquimista',
    icono: '⚗️',
    desc: 'Transforma ideas en algo que el mundo no había visto',
    color: '#34D399',
    colorSecundario: '#059669',
    particulas: 'burbujas',
    animacion: 'alquimia'
  },
  8: {
    nombre: 'El Oráculo',
    icono: '🌀',
    desc: 'Sus palabras abren puertas que otros no ven',
    color: '#A78BFA',
    colorSecundario: '#5B21B6',
    particulas: 'espiral',
    animacion: 'espiral'
  },
  9: {
    nombre: 'Voz del Lugar',
    icono: '👁️',
    desc: 'Elegido por el fundador como voz esencial del foro',
    color: '#E8A020',
    colorSecundario: '#92400E',
    particulas: 'dorado',
    animacion: 'ojo'
  },
  10: {
    nombre: 'El Fundador',
    icono: '🜂',
    desc: 'Creó el lugar donde las preguntas importan más que las respuestas',
    color: '#E8A020',
    colorSecundario: '#1A1020',
    particulas: 'fuego_dorado',
    animacion: 'fundador'
  }
};

function mostrarInsignia(nivel) {
  const config = INSIGNIAS_CONFIG[nivel];
  if (!config) return;

  // Crear overlay
  const overlay = document.createElement('div');
  overlay.className = 'insignia-overlay';
  overlay.id = 'insignia-overlay';

  // Generar partículas
  const particulas = generarParticulas(config);

  overlay.innerHTML = `
    <div class="insignia-modal insignia-modal-${config.animacion}">
      <div class="insignia-modal-bg" style="--color-principal: ${config.color}; --color-secundario: ${config.colorSecundario}"></div>
      ${particulas}
      <div class="insignia-modal-contenido">
        <p class="insignia-modal-kicker">Nueva insignia desbloqueada</p>
        <div class="insignia-modal-icono-wrap">
          <div class="insignia-modal-icono-ring" style="border-color: ${config.color}20; box-shadow: 0 0 60px ${config.color}30"></div>
          <div class="insignia-modal-icono-ring2" style="border-color: ${config.color}40"></div>
          <span class="insignia-modal-icono">${config.icono}</span>
        </div>
        <h2 class="insignia-modal-nombre" style="color: ${config.color}">${config.nombre}</h2>
        <p class="insignia-modal-desc">${config.desc}</p>
        <div class="insignia-modal-linea" style="background: linear-gradient(90deg, transparent, ${config.color}, transparent)"></div>
        <p class="insignia-modal-frase">"Has alcanzado un nuevo nivel en El Lugar Olvidado"</p>
        <button class="insignia-modal-btn" style="border-color: ${config.color}50; color: ${config.color}" onclick="cerrarInsignia()">
          Continuar explorando
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animar entrada
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });

  // Auto cerrar en 8 segundos
  setTimeout(() => cerrarInsignia(), 8000);
}

function generarParticulas(config) {
  const cantidad = 20;
  let html = '<div class="insignia-particulas">';

  for (let i = 0; i < cantidad; i++) {
    const x = Math.random() * 100;
    const delay = Math.random() * 3;
    const duracion = 2 + Math.random() * 3;
    const tamanio = 3 + Math.random() * 6;
    const tipo = config.particulas;

    let estilo = `
      left: ${x}%;
      animation-delay: ${delay}s;
      animation-duration: ${duracion}s;
      width: ${tamanio}px;
      height: ${tamanio}px;
      background: ${config.color};
      box-shadow: 0 0 ${tamanio * 2}px ${config.color};
    `;

    if (tipo === 'rayos') {
      estilo += `transform: rotate(${Math.random() * 360}deg); border-radius: 0;`;
    } else if (tipo === 'espiral') {
      estilo += `border-radius: 50%; animation-name: particulaEspiral;`;
    } else {
      estilo += `border-radius: 50%;`;
    }

    html += `<div class="particula particula-${tipo}" style="${estilo}"></div>`;
  }

  html += '</div>';
  return html;
}

function cerrarInsignia() {
  const overlay = document.getElementById('insignia-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 600);
  }
}

// Exportar para uso global
window.mostrarInsignia = mostrarInsignia;
window.cerrarInsignia = cerrarInsignia;