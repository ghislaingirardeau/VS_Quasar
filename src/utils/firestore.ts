import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from 'src/stores/auth';
// import { useCards } from 'src/stores/card';
// import { useLists } from 'src/stores/lists';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { DataProperty } from 'src/types';
import { Card } from 'src/types/cards';
import { List } from 'src/types/lists';
import { ShoppingItem } from 'src/types/shopping';

// Initialiser Firestore
const db = getFirestore();
const authStore = useAuth();

export async function updateDataFirestore(
  element: List[] | Card[] | ShoppingItem[],
  type: DataProperty,
) {
  if (authStore.user && authStore.user?.uid) {
    const userDocRef = doc(db, 'users', authStore.user.uid);
    // Vérification du type basée sur les propriétés distinctives
    console.log('firestore is updating...');
    if (type === 'cards') {
      await updateDoc(userDocRef, { cards: element });
      return;
    }
    if (type === 'lists') {
      await updateDoc(userDocRef, { lists: element });
      return;
    }
    if (type === 'currentShopping') {
      await updateDoc(userDocRef, { currentShopping: element });
      return;
    }
    if (type === 'shoppingList') {
      await updateDoc(userDocRef, { shoppingList: element });
      return;
    }
  }
}

export async function updateDataFirestoreOnClose() {
  // const cardsStore = useCards();
  // const listsStore = useLists();
  const shoppingStore = useShoppingItem();

  if (authStore.user && authStore.user?.uid) {
    const userDocRef = doc(db, 'users', authStore.user.uid);
    await updateDoc(userDocRef, {
      currentShopping: shoppingStore.shoppingItems,
    });
    // Promise.all([
    //   await updateDoc(userDocRef, { cards: cardsStore.cards }),
    //   await updateDoc(userDocRef, { lists: listsStore.lists }),
    //   await updateDoc(userDocRef, {
    //     currentShopping: shoppingStore.shoppingItems,
    //   }),
    // ]);
  }
}
