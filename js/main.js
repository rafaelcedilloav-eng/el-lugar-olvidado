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

});
```

---

**¿Qué hace este JavaScript?**

Dos cosas concretas:

La navegación se oculta cuando scrolleas hacia abajo — porque cuando lees, no necesitas la nav ocupando espacio — y reaparece cuando subes, porque ahí sí la necesitas. Es el comportamiento que ves en sitios premium.

Las tarjetas y secciones aparecen con una animación suave cuando llegas a ellas en lugar de estar todas cargadas de golpe. Eso se llama `IntersectionObserver` — el navegador detecta cuándo un elemento entra al campo de visión y lo hace visible gradualmente.

---

**Paso 8 — Guardar y publicar**

Ahora viene el momento. Todo lo que escribiste hay que enviarlo a GitHub para que el sitio se actualice en vivo.

En VS Code del navegador, esto se hace así:

1. Click en el ícono de **rama/control de versiones** en la barra izquierda — parece un círculo con líneas
2. Verás todos los archivos que creaste listados como cambios pendientes
3. En el campo que dice **"Message"** escribe:
```
primer commit: estructura base de El Lugar Olvidado