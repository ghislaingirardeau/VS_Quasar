import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from 'src/stores/auth';
import { DataProperty } from 'src/types';
import { Card } from 'src/types/cards';
import { List } from 'src/types/lists';

// Initialiser Firestore
const db = getFirestore();
const authStore = useAuth();

export async function updateDataFirestore(
  element: List[] | Card[],
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
    if (type === 'shoppingList') {
      await updateDoc(userDocRef, { shoppingList: element });
      return;
    }
  }
}
