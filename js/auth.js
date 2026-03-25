/**
 * RAFA OS - Augmented Intelligence Architecture
 * Module: Identity & Access Management (IAM)
 * Security: Zero-Trust Framework / Google OAuth
 */

;(function() {
  'use strict';

  const SUPABASE_URL = 'https://vvexfxjizczurnmubqxo.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_o7bG1gCCqBVTO6MwX6UWuw_3SL7YHWS';
  const { createClient } = supabase;
  const _db = createClient(SUPABASE_URL, SUPABASE_KEY);

  const PUBLIC_PAGES = ['login.html', 'index.html', 'manifiesto.html', 'autor.html', 'ensayos.html'];

  const IAM = {
    user: null,

    async init() {
        _db.auth.onAuthStateChange(async (event, session) => {
            this.user = session?.user || null;
            this.syncUI(this.user);
            this.enforceSecurity(this.user);
        });

        const { data: { session } } = await _db.auth.getSession();
        this.user = session?.user || null;
    },

    enforceSecurity(user) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (!user && !PUBLIC_PAGES.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    },

    syncUI(user) {
        const authBtn = document.getElementById('auth-button');
        const userDisplay = document.getElementById('user-name');
        
        if (authBtn) {
            authBtn.textContent = user ? 'Cerrar Sesión' : 'Entrar con Google';
            authBtn.onclick = (e) => {
                e.preventDefault();
                user ? this.logout() : this.login();
            };
        }

        if (userDisplay && user) {
            userDisplay.textContent = user.user_metadata.full_name || user.email;
        }
    },

    async login() {
        await _db.auth.signInWithOAuth({
            provider: 'google',
            options: { 
                // Usamos el callback.html que ya tienes en la raíz
                redirectTo: 'https://rafaelcedilloav-eng.github.io/el-lugar-olvidado/callback.html' 
            }
        });
    },

    async logout() {
        await _db.auth.signOut();
        window.location.href = 'login.html';
    }
  };

  window.__ELO = {
    getClient: () => _db,
    getCurrentUser: () => IAM.user,
    loginWithGoogle: () => IAM.login(),
    logout: () => IAM.logout()
  };

  document.addEventListener('DOMContentLoaded', () => IAM.init());

})();