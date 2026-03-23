// ── Supabase Auth — El Lugar Olvidado
const SUPABASE_URL = 'https://vvexfxjizczurnmubqxo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_o7bG1gCCqBVTO6MwX6UWuw_3SL7YHWS';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Páginas públicas — no requieren auth
const PUBLIC_PAGES = ['login.html', 'index.html', 'manifiesto.html', 'autor.html', 'ensayos.html'];

// Verificar sesión activa
async function checkAuth() {
  const { data: { session } } = await _supabase.auth.getSession();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isPublic = PUBLIC_PAGES.some(p => currentPage.includes(p));

  if (!session && !isPublic) {
    window.location.href = '/el-lugar-olvidado/login.html';
    return null;
  }
  return session;
}

// Login con Google
async function loginWithGoogle() {
  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://rafaelcedilloav-eng.github.io/el-lugar-olvidado/index.html'
    }
  });
  if (error) console.error('Error login:', error.message);
}

// Logout
async function logout() {
  await _supabase.auth.signOut();
  window.location.href = '/el-lugar-olvidado/login.html';
}

// Obtener usuario actual
async function getCurrentUser() {
  const { data: { user } } = await _supabase.auth.getUser();
  return user;
}

// Ejecutar verificación al cargar
document.addEventListener('DOMContentLoaded', async () => {
  const session = await checkAuth();

  if (session) {
    const user = session.user;
    // Actualizar nav con nombre de usuario si existe el elemento
    const navUser = document.getElementById('nav-user');
    if (navUser) {
      navUser.textContent = user.user_metadata?.full_name || user.email;
    }
  }
});