import { mdiContentSaveCheck, mdiContentSaveOff } from '@quasar/extras/mdi-v7';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
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
    console.log('maj de la liste de course');
  }
}

export async function updateGlobalDataFirestore() {
  try {
    const auth = useAuth();
    const userDocRef = doc(db, 'users', auth.user!.uid!);

    const listsStore = useLists();
    const cardsStore = useCards();
    const shoppingStore = useShoppingItem();

    await updateDoc(userDocRef, {
      lists: listsStore.lists,
      cards: cardsStore.cards,
      shoppingData: shoppingStore.shoppingsData,
    });

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

export async function getDataFirestore() {
  try {
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
      console.log(docSnap.data());
      const { lists, cards, shoppingData } = docSnap.data() as AppDatas;
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
