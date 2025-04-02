import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from 'src/stores/auth';
import { DataProperty } from 'src/types';
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

export async function updateDataFirestoreOnClose(data: {
  lists: List[];
  cards: Card[];
  currentShopping: ShoppingItem[];
  userUid: string;
}) {
  const userDocRef = doc(db, 'users', data.userUid);

  await updateDoc(userDocRef, {
    lists: data.lists,
    cards: data.cards,
    currentShopping: data.currentShopping,
  });
}
