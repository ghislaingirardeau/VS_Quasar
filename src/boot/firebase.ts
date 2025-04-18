import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithCustomToken,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Définir la persistance locale
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistance configurée sur locale');
  })
  .catch((error) => {
    console.error('Erreur de configuration de la persistance :', error);
  });

// Lors du SignIn ou logout, on utilise un ecouteur d'event de firebase pour gérer la connection dans le store
// store - auth.ts
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    console.log('Utilisateur connecté');
  } catch (error) {
    console.error("Erreur d'authentification :", error);
  }
};

const signInWithWebAuth = async (token: string) => {
  try {
    const res = await signInWithCustomToken(auth, token);

    /* Pour ajouter plus d'informations au nouvelle utilisateur */
    /* await updateProfile(auth.currentUser!, {
      displayName: 'Lulu',
    }); */
    console.log('Utilisateur connecté avec webAuth', res);
  } catch (error) {
    console.error("Erreur d'authentification :", error);
  }
};

const logout = async () => {
  await signOut(auth);
  console.log('Utilisateur déconnecté');
  //   authStore.logout();
};

// export ce que l'on veut pouvoir réutiliser par la suite dans l'app
export { auth, signInWithGoogle, logout, signInWithWebAuth };
export default boot(() => {});
