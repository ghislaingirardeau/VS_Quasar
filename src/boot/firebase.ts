import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCz6WkCm_29hT-ukdTOjVwM4M1oifA_Hmg',
  authDomain: 'tools-list-b6f84.firebaseapp.com',
  projectId: 'tools-list-b6f84',
  storageBucket: 'tools-list-b6f84.firebasestorage.app',
  messagingSenderId: '441021519638',
  appId: '1:441021519638:web:1db18c33c8383530fde237',
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

const logout = async () => {
  await signOut(auth);
  console.log('Utilisateur déconnecté');
  //   authStore.logout();
};

// export ce que l'on veut pouvoir réutiliser par la suite dans l'app
export { auth, signInWithGoogle, logout };
export default boot(() => {});
