// ============================================
// EL LUGAR OLVIDADO — Lógica principal
// ============================================

// Esperamos a que el HTML cargue completamente
// antes de ejecutar cualquier cosa
document.addEventListener('DOMContentLoaded', () => {

  // ── Navegación: ocultar al hacer scroll hacia abajo,
  //    mostrar al subir — comportamiento profesional
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 80) {
      nav.style.transform = 'translateY(-100%)';
      nav.style.transition = 'transform 0.3s ease';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // ── Animación de entrada: los elementos aparecen
  //    suavemente cuando el usuario llega a ellos
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Aplicar animación a cards y secciones
  document.querySelectorAll('.cat-card, .manifesto-quote, .section-title')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // ── Menú hamburguesa para móvil
  window.toggleMenu = function() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('nav-menu-open');
  };

  // Cerrar menú al hacer click en un link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('main-nav')
        .classList.remove('nav-menu-open');
    });
  });
// ── Activar filtro desde URL si viene de una categoría
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const btn = document.querySelector(`[data-filtro="${cat}"]`);
    if (btn) btn.click();
  }
  
// ── Órbita sigue el scroll — siempre centrada
  const orbita = document.getElementById('orbita');
  if (orbita) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const centerY = window.innerHeight / 2;
      orbita.style.top = (centerY + scrollY) + 'px';
      orbita.style.transform = 'translate(-50%, -50%)';
    });
  }

});
