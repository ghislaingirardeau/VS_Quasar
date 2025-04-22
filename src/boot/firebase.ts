import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
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

// export ce que l'on veut pouvoir réutiliser par la suite dans l'app
export { auth, provider };
export default boot(() => {});
