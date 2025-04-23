import { signInWithCustomToken, signInWithPopup, signOut } from 'firebase/auth';
import { useWebAuth } from 'utils/useWebAuth';
import { auth, provider } from 'src/boot/firebase';
import { useAuth } from 'src/stores/auth';

const authStore = useAuth();

export const useFirebaseAuth = {
  async signInWithGoogle() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  },

  async signInWithWebAuth(token: string) {
    try {
      await signInWithCustomToken(auth, token);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  },

  async logout() {
    await signOut(auth);
    console.log('Utilisateur déconnecté');
    if (authStore.hasWebAuthRegister) {
      await useWebAuth.logout();
    }
  },
};
