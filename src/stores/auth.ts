import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from 'src/boot/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const useAuth = defineStore('auth', () => {
  const user = ref<Partial<User> | null>(null);
  const loggedIn = ref(false);
  const loggedOut = ref(true);

  // Écouter les changements d'état d'authentification
  onAuthStateChanged(auth, (firebaseUser) => {
    // si connecter ou si la persitence de connection est assuré
    // sinon cel aveut dire qu'aucun user n'est connecté
    if (firebaseUser) {
      const { uid, displayName, email } = firebaseUser;
      user.value = { uid, displayName, email };
      loggedIn.value = true;
      loggedOut.value = false;
    } else {
      user.value = null;
      loggedIn.value = false;
      loggedOut.value = true;
    }
  });

  return {
    user,
    loggedIn,
    loggedOut,
  };
});
