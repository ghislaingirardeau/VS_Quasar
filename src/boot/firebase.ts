import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useAuth } from 'src/stores/auth';

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
const authStore = useAuth();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Utilisateur connecté :', result.user);
    authStore.login(result.user);
  } catch (error) {
    console.error("Erreur d'authentification :", error);
  }
};

const logout = async () => {
  await signOut(auth);
  console.log('Utilisateur déconnecté');
  authStore.logout();
};

export { auth, signInWithGoogle, logout };
export default boot(() => {});
