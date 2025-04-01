import { defineStore } from 'pinia';
import { ref } from 'vue';

// On utilise ici l'auth sur app.vue mais on pourrait aussi l'utiliser dans boot file OU routes !
// en SSR, il faudrait utiliser prefetch

export const useAuth = defineStore('auth', () => {
  const auth = ref(null);
  const loggedIn = ref(false);
  const loggedOut = ref(true);

  function login(payload) {
    loggedIn.value = true;
    loggedOut.value = false;
    auth.value = payload;
  }

  function logout() {
    loggedIn.value = false;
    loggedOut.value = true;
    auth.value = null;
  }

  return {
    auth,
    loggedIn,
    loggedOut,
    login,
    logout,
  };
});
