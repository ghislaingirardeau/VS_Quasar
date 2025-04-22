import { signInWithCustomToken, signInWithPopup, signOut } from 'firebase/auth';
import { useWebAuth } from 'utils/useWebAuth';
import { auth, provider } from 'src/boot/firebase';

export const useFirebaseAuth = {
  async signInWithGoogle() {
    try {
      await signInWithPopup(auth, provider);
      console.log('Utilisateur connecté');
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  },

  async signInWithWebAuth(token: string) {
    try {
      const res = await signInWithCustomToken(auth, token);
      console.log('Utilisateur connecté avec webAuth', res);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    }
  },

  async logout() {
    await signOut(auth);
    console.log('Utilisateur déconnecté');
    if (process.env.NODE_ENV === 'development') {
      await useWebAuth.logout();
    }
  },
};
