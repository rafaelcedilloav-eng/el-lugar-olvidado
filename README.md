# El Lugar Olvidado 🌀

### Arquitectura de Sistema y Ecosistema Ontológico
Este repositorio no es solo un sitio estático; es un ecosistema de comunidad diseñado bajo principios de **Zero-Trust** y **Automatización de Backend**.

## 🛠️ Stack Tecnológico
- **Frontend:** HTML5 / CSS3 (Tech-Noir Aesthetic) / Vanilla JavaScript.
- **Backend-as-a-Service:** Supabase (PostgreSQL).
- **Autenticación:** Google OAuth con persistencia de sesión.
- **Infraestructura:** GitHub Pages con despliegue continuo.

## 🛡️ Arquitectura de Seguridad y Gamificación
A diferencia de aplicaciones convencionales donde la lógica de niveles reside en el cliente, "El Lugar Olvidado" implementa un motor de integridad en la base de datos:

1. **Inmutabilidad RLS:** Todas las tablas de privilegios (`titulos_usuario`, `victorias_debate`) están protegidas por políticas de **Row Level Security (RLS)** que bloquean inserciones directas desde el cliente (`WITH CHECK (false)`).
2. **Postgres Engine:** El sistema de 10 niveles de insignias se gestiona mediante **Triggers asíncronos** y funciones en PL/pgSQL. Esto garantiza que la progresión del usuario sea inalterable y se audite en tiempo real en el servidor.
3. **Protocolo "El Bufón":** Implementación de un sistema de telemetría que detecta intentos de manipulación de API y degrada permanentemente el nivel del atacante mediante funciones `SECURITY DEFINER`.

## 📖 Filosofía del Proyecto
Basado en la tesis de *Alquimia del Siglo XXI*, este espacio busca reducir la entropía del debate digital mediante estructuras de interacción que recompensan la profundidad y la participación auténtica.