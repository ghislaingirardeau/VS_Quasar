import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// On utilise ici l'auth sur app.vue mais on pourrait aussi l'utiliser dans boot file OU routes !
// en SSR, il faudrait utiliser prefetch

export const useAuthTuto = defineStore('auth', () => {
  const logging = ref(false);
  const loggedIn = useLocalStorage('auth.loggedIn', false);
  const loggedOut = ref(true);

  function login() {
    return new Promise((resolve, reject) => {
      logging.value = true;

      // ICI on viendrait mettre la logique de connexion await...
      setTimeout(() => {
        logging.value = false;
        loggedIn.value = true;
        resolve(true);
      }, 1500);
    });
  }

  function logout() {
    return new Promise((resolve, reject) => {
      logging.value = true;

      setTimeout(() => {
        loggedIn.value = false;
        logging.value = false;
        loggedOut.value = true;
        resolve(true);
      }, 1000);
    });
  }

  return {
    logging,
    loggedIn,
    loggedOut,
    login,
    logout,
  };
});
