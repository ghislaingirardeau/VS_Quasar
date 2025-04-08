import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
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

  console.log('firestore check auth...');

  if (authStore.user && authStore.user?.uid) {
    const userDocRef = doc(db, 'users', authStore.user.uid);
    // Vérification du type basée sur les propriétés distinctives
    console.log('firestore is updating...');
    await updateDoc(userDocRef, { [type]: element });
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
    currentShopping: data,
  });
}

export async function getDataFirestore() {
  const authStore = useAuth();

  if (authStore.user && authStore.user?.uid) {
    const docRef = doc(db, 'users', authStore.user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}
