import { mdiContentSaveCheck, mdiContentSaveOff } from '@quasar/extras/mdi-v7';
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { Notify } from 'quasar';
import { useAuth } from 'src/stores/auth';
import { useCards } from 'src/stores/card';
import { useLists } from 'src/stores/lists';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { AddPromiseError, AppDatas } from 'src/types';

// Initialiser Firestore
const db = getFirestore();

/* export async function updateDataFirestore(
  element: List[] | Card[] | ShoppingItem[],
  type: DataProperty,
) {
  const authStore = useAuth();

  console.log('firestore check auth...');

  if (authStore.user && authStore.user?.uid) {
    const userDocRef = doc(db, 'users', authStore.user.uid);
    // Vérification du type basée sur les propriétés distinctives
    console.log('firestore is updating...');
    await updateDoc(userDocRef, { [type]: element });
  }
} */

export async function updateShoppingDataFirestore() {
  const authStore = useAuth();
  const shoppingStore = useShoppingItem();

  if (authStore.user && authStore.user?.uid) {
    const userDocRef = doc(db, 'users', authStore.user.uid);
    // Vérification du type basée sur les propriétés distinctives
    await updateDoc(userDocRef, { shoppingData: shoppingStore.shoppingsData });
  }
}

// Au clique de la sauvegarde, on met à jour les données de l'utilisateur dans Firestore
export async function updateGlobalDataFirestore(showNotification = true) {
  try {
    const authStore = useAuth();
    const userDocRef = doc(db, 'users', authStore.user!.uid!);

    const listsStore = useLists();
    const cardsStore = useCards();
    const shoppingStore = useShoppingItem();

    console.log(listsStore.lists);

    await updateDoc(userDocRef, {
      lists: listsStore.lists,
      cards: cardsStore.cards,
      shoppingData: shoppingStore.shoppingsData,
    });

    if (showNotification)
      Notify.create({
        message: 'Sauvegarde réussie',
        color: 'secondary',
        icon: mdiContentSaveCheck,
        timeout: 3000,
      });
  } catch (error: unknown) {
    Notify.create({
      message: (error as AddPromiseError).message,
      color: 'danger',
      icon: mdiContentSaveOff,
      timeout: 3000,
    });
  }
}

// Set firestore pour un nouvel utilisateur
async function setUserDataFirestore() {
  const authStore = useAuth();
  const userDocRef = doc(db, 'users', authStore.user!.uid!);
  const docSnap = await getDoc(userDocRef);
  // Vérification si le document existe déjà
  if (docSnap.data()) return { isNewUser: false };
  // Sinon, on le crée avec les données par défaut
  await setDoc(doc(db, 'users', authStore.user!.uid!), {
    lists: [],
    cards: [],
    shoppingData: [],
  });
  return { isNewUser: true };
}

// Sync firestore avec le localstorage si celui-ci est vide
export async function setDataFirestoreOnConnection() {
  try {
    // Si c'est un nouvel utilisateur, pas de données à synchroniser
    const { isNewUser } = await setUserDataFirestore();
    if (isNewUser) return;

    const authStore = useAuth();
    const listsStore = useLists();
    const cardsStore = useCards();
    const shoppingStore = useShoppingItem();

    // A la connection, meme si persitence, initialise les datas from firestore seulement si une des listes est vide dans le localstorage
    const hasToSyncData =
      listsStore.lists.length ||
      cardsStore.cards.length ||
      shoppingStore.shoppingsData.length;

    if (!hasToSyncData) {
      const docRef = doc(db, 'users', authStore.user!.uid!);
      const docSnap = await getDoc(docRef);
      const { lists, cards, shoppingData } = docSnap.data() as AppDatas;

      // Synchoniser les données de Firestore avec le store Pinia
      listsStore.initListsFromFirestore(lists);
      cardsStore.initCardsFromFirestore(cards);
      shoppingStore.initShoppingDataFromFirestore(shoppingData);

      Notify.create({
        message: 'Synchronisation des données réussies',
        color: 'secondary',
        icon: mdiContentSaveCheck,
        timeout: 3000,
      });
    }
  } catch (error) {
    Notify.create({
      message: 'Impossible de récupérer les données',
      color: 'danger',
      icon: mdiContentSaveOff,
      timeout: 3000,
    });
  }
}
