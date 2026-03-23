// ── Sistema de Insignias — El Lugar Olvidado
;(function() {
  'use strict';

  const INSIGNIAS_CONFIG = {
    1:  { nombre: 'El Curioso',     icono: '🕯️', desc: 'Toda búsqueda comienza con una pregunta',                              color: '#F5E6C8', colorSecundario: '#C8A96E', particulas: 'luz',         animacion: 'vela'     },
    2:  { nombre: 'El Pensador',    icono: '📖', desc: 'Pensar en voz alta es el primer acto de valentía',                     color: '#E8D5A3', colorSecundario: '#B8964E', particulas: 'paginas',     animacion: 'libro'    },
    3:  { nombre: 'El Debatiente',  icono: '⚡', desc: 'Las ideas que generan fricción son las que cambian mentes',            color: '#60A5FA', colorSecundario: '#1D4ED8', particulas: 'rayos',       animacion: 'electrico'},
    4:  { nombre: 'El Filósofo',    icono: '🏛️', desc: 'No busca respuestas — construye mejores preguntas',                   color: '#C4A8E8', colorSecundario: '#6D28D9', particulas: 'piedra',      animacion: 'pilares'  },
    5:  { nombre: 'El Guardián',    icono: '🔥', desc: 'El conocimiento que no se comparte se extingue',                       color: '#FB923C', colorSecundario: '#EA580C', particulas: 'fuego',       animacion: 'llamas'   },
    6:  { nombre: 'El Mensajero',   icono: '🪶', desc: 'Abre las puertas del lugar a quienes aún no saben que lo buscan',     color: '#E2E8F0', colorSecundario: '#94A3B8', particulas: 'pluma',       animacion: 'flotar'   },
    7:  { nombre: 'El Alquimista',  icono: '⚗️', desc: 'Transforma ideas en algo que el mundo no había visto',                color: '#34D399', colorSecundario: '#059669', particulas: 'burbujas',    animacion: 'alquimia' },
    8:  { nombre: 'El Oráculo',     icono: '🌀', desc: 'Sus palabras abren puertas que otros no ven',                         color: '#A78BFA', colorSecundario: '#5B21B6', particulas: 'espiral',     animacion: 'espiral'  },
    9:  { nombre: 'Voz del Lugar',  icono: '👁️', desc: 'Elegido por el fundador como voz esencial del foro',                 color: '#E8A020', colorSecundario: '#92400E', particulas: 'dorado',      animacion: 'ojo'      },
    10: { nombre: 'El Fundador',    icono: '🜂', desc: 'Creó el lugar donde las preguntas importan más que las respuestas',   color: '#E8A020', colorSecundario: '#1A1020', particulas: 'fuego_dorado',animacion: 'fundador' }
  };

  // ── GENERADORES DE PARTÍCULAS ────────────────────────────────────────────────

  function generarParticulas(config) {
    const tipo = config.particulas;
    if (tipo === 'fuego_dorado') return generarParticulasFundador(config);
    if (tipo === 'espiral')      return generarParticulasEspiral(config);
    if (tipo === 'rayos')        return generarParticulasRayos(config);
    if (tipo === 'fuego')        return generarParticulasFuego(config);
    if (tipo === 'pluma')        return generarParticulasPluma(config);
    if (tipo === 'burbujas')     return generarParticulasBurbujas(config);
    if (tipo === 'luz')          return generarParticulasLuz(config);
    if (tipo === 'dorado')       return generarParticulasDorado(config);
    return generarParticulasDefault(config);
  }

  function generarParticulasDefault(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * 100, delay = Math.random() * 3, dur = 2.5 + Math.random() * 2.5, size = 3 + Math.random() * 5;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size}px;background:${config.color};border-radius:50%;box-shadow:0 0 ${size*2}px ${config.color};animation:particulaSubir ${dur}s ${delay}s linear infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasLuz(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 14; i++) {
      const x = 30 + Math.random() * 40, delay = Math.random() * 4, dur = 3 + Math.random() * 3, size = 2 + Math.random() * 3, drift = (Math.random() - 0.5) * 40;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size}px;background:${config.color};border-radius:50%;box-shadow:0 0 ${size*3}px ${config.color};--drift:${drift}px;animation:particulaVela ${dur}s ${delay}s ease-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasFuego(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 22; i++) {
      const x = Math.random() * 100, delay = Math.random() * 2, dur = 1.5 + Math.random() * 2, size = 4 + Math.random() * 8, drift = (Math.random() - 0.5) * 30;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size*1.8}px;background:linear-gradient(to top,${config.colorSecundario},${config.color});border-radius:50% 50% 20% 20%;--drift:${drift}px;animation:particulaLlama ${dur}s ${delay}s ease-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasRayos(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * 100, y = Math.random() * 100, delay = Math.random() * 1.5, dur = 0.3 + Math.random() * 0.5, rot = -45 + Math.random() * 90, len = 8 + Math.random() * 20;
      html += `<div class="particula" style="left:${x}%;top:${y}%;width:${len}px;height:2px;background:${config.color};box-shadow:0 0 6px ${config.color},0 0 12px ${config.color};transform:rotate(${rot}deg);animation:particulaRayo ${dur}s ${delay}s ease-in-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasPluma(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * 100, delay = Math.random() * 5, dur = 4 + Math.random() * 4, size = 2 + Math.random() * 4, drift = (Math.random() - 0.5) * 60;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size}px;background:${config.color};border-radius:50%;opacity:0.6;--drift:${drift}px;animation:particulaFlotar ${dur}s ${delay}s ease-in-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasBurbujas(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * 100, delay = Math.random() * 4, dur = 3 + Math.random() * 3, size = 6 + Math.random() * 14, drift = (Math.random() - 0.5) * 40;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size}px;border:1px solid ${config.color};border-radius:50%;background:${config.color}18;--drift:${drift}px;animation:particulaSubir ${dur}s ${delay}s ease-in-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasEspiral(config) {
    let html = '<div class="insignia-particulas insignia-particulas-espiral">';
    for (let i = 0; i < 12; i++) {
      const delay = (i / 12) * 2, size = 4 + Math.random() * 5;
      html += `<div class="particula" style="width:${size}px;height:${size}px;background:${config.color};border-radius:50%;box-shadow:0 0 8px ${config.color};animation:particulaOrbita 3s ${delay}s linear infinite;--orbita-radio:${60 + Math.random() * 40}px;--orbita-inicio:${(i / 12) * 360}deg;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasDorado(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100, y = Math.random() * 100, delay = Math.random() * 3, dur = 1.5 + Math.random() * 2, size = 2 + Math.random() * 4;
      html += `<div class="particula" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${config.color};border-radius:50%;box-shadow:0 0 ${size*4}px ${config.color};animation:particulaDestello ${dur}s ${delay}s ease-in-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  function generarParticulasFundador(config) {
    let html = '<div class="insignia-particulas">';
    for (let i = 0; i < 24; i++) {
      const x = Math.random() * 100, delay = Math.random() * 4, dur = 2 + Math.random() * 3, size = 2 + Math.random() * 5, drift = (Math.random() - 0.5) * 50;
      html += `<div class="particula" style="left:${x}%;width:${size}px;height:${size}px;background:radial-gradient(circle,#FFF5CC,${config.color});border-radius:50%;box-shadow:0 0 ${size*3}px ${config.color},0 0 ${size*6}px ${config.color}60;--drift:${drift}px;animation:particulaBrasa ${dur}s ${delay}s ease-in infinite;"></div>`;
    }
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * 100, y = Math.random() * 100, delay = Math.random() * 3, dur = 1 + Math.random() * 1.5, size = 1 + Math.random() * 3;
      html += `<div class="particula" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:#FFF5CC;border-radius:50%;box-shadow:0 0 ${size*5}px #E8A020;animation:particulaDestello ${dur}s ${delay}s ease-in-out infinite;"></div>`;
    }
    return html + '</div>';
  }

  // ── MOSTRAR INSIGNIA ──────────────────────────────────────────────────────────

  function mostrarInsignia(nivel) {
    const config = INSIGNIAS_CONFIG[nivel];
    if (!config) return;

    const prev = document.getElementById('insignia-overlay');
    if (prev) prev.remove();

    const esFundador = nivel === 10;
    const overlay = document.createElement('div');
    overlay.className = 'insignia-overlay' + (esFundador ? ' insignia-overlay-fundador' : '');
    overlay.id = 'insignia-overlay';

    const particulas = generarParticulas(config);

    if (esFundador) {
      overlay.innerHTML = `
        <div class="insignia-modal insignia-modal-fundador">
          <div class="insignia-fundador-bg"></div>
          <div class="insignia-fundador-linea-h"></div>
          <div class="insignia-fundador-linea-v"></div>
          ${particulas}
          <div class="insignia-modal-contenido">
            <p class="insignia-modal-kicker insignia-fundador-kicker">— Origen —</p>
            <div class="insignia-modal-icono-wrap">
              <div class="insignia-fundador-ring1"></div>
              <div class="insignia-fundador-ring2"></div>
              <div class="insignia-fundador-ring3"></div>
              <span class="insignia-modal-icono insignia-fundador-icono">${config.icono}</span>
            </div>
            <h2 class="insignia-modal-nombre insignia-fundador-nombre">${config.nombre}</h2>
            <p class="insignia-modal-desc insignia-fundador-desc">${config.desc}</p>
            <div class="insignia-fundador-separador">
              <span class="insignia-fundador-sep-linea"></span>
              <span class="insignia-fundador-sep-punto">✦</span>
              <span class="insignia-fundador-sep-linea"></span>
            </div>
            <p class="insignia-fundador-frase">"Antes del lugar, solo existía el silencio"</p>
            <button class="insignia-modal-btn insignia-fundador-btn" onclick="cerrarInsignia()">Continuar</button>
          </div>
        </div>
      `;
    } else {
      overlay.innerHTML = `
        <div class="insignia-modal insignia-modal-${config.animacion}">
          <div class="insignia-modal-bg" style="--color-principal:${config.color};--color-secundario:${config.colorSecundario}"></div>
          ${particulas}
          <div class="insignia-modal-contenido">
            <p class="insignia-modal-kicker">Nueva insignia desbloqueada</p>
            <div class="insignia-modal-icono-wrap">
              <div class="insignia-modal-icono-ring" style="border-color:${config.color}30;box-shadow:0 0 40px ${config.color}25"></div>
              <div class="insignia-modal-icono-ring2" style="border-color:${config.color}50"></div>
              <span class="insignia-modal-icono">${config.icono}</span>
            </div>
            <h2 class="insignia-modal-nombre" style="color:${config.color}">${config.nombre}</h2>
            <p class="insignia-modal-desc">${config.desc}</p>
            <div class="insignia-modal-linea" style="background:linear-gradient(90deg,transparent,${config.color},transparent)"></div>
            <p class="insignia-modal-frase">"Has alcanzado un nuevo nivel en El Lugar Olvidado"</p>
            <button class="insignia-modal-btn" style="border-color:${config.color}50;color:${config.color}" onclick="cerrarInsignia()">Continuar explorando</button>
          </div>
        </div>
      `;
    }

    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('visible')));
    setTimeout(() => cerrarInsignia(), esFundador ? 12000 : 8000);
  }

  function cerrarInsignia() {
    const overlay = document.getElementById('insignia-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 600);
    }
  }

  // Solo exponemos las funciones de UI — no el cliente de Supabase
  window.mostrarInsignia = mostrarInsignia;
  window.cerrarInsignia = cerrarInsignia;

})();