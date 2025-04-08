import { mdiContentSaveCheck, mdiContentSaveOff } from '@quasar/extras/mdi-v7';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Notify } from 'quasar';
import { useAuth } from 'src/stores/auth';
import { useCards } from 'src/stores/card';
import { useLists } from 'src/stores/lists';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { AddPromiseError, DataProperty } from 'src/types';
import { Card } from 'src/types/cards';
import { List } from 'src/types/lists';
import { ShoppingItem } from 'src/types/shopping';

// Initialiser Firestore
const db = getFirestore();

export async function updateDataFirestore(
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
      shoppingList: shoppingStore.shoppingsData,
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
  const authStore = useAuth();

  if (authStore.user && authStore.user?.uid) {
    const docRef = doc(db, 'users', authStore.user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}
