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
import { useCards } from 'src/stores/card';
import { useLists } from 'src/stores/lists';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { useAuth } from 'src/stores/auth';

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

const logout = async () => {
  await signOut(auth);
  console.log('Utilisateur déconnecté');
  //   authStore.logout();
};

// export ce que l'on veut pouvoir réutiliser par la suite dans l'app
export { auth, signInWithGoogle, logout };
export default boot(() => {
  window.addEventListener('beforeunload', () => {
    if (navigator.serviceWorker.controller) {
      const listsStore = useLists();
      const cardsStore = useCards();
      const shoppingStore = useShoppingItem();
      const auth = useAuth();

      navigator.serviceWorker.controller.postMessage({
        type: 'SAVE_TO_FIRESTORE',
        payload: {
          lists: listsStore.lists,
          cards: cardsStore.cards,
          currentShopping: shoppingStore.shoppingItems,
          userUid: auth.user?.uid,
        },
      });
    }
  });
});
