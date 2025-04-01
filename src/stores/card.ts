import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Card } from 'src/types/cards';
import { computed, ref, Ref } from 'vue';
import { updateDataFirestore } from 'src/utils/firestore';

// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { useAuth } from './auth';

// // Initialiser Firestore
// const db = getFirestore();
// const authStore = useAuth();

// async function updateCardsFirebase(cards: Card[]) {
//   if (authStore.user && authStore.user?.uid) {
//     const userDocRef = doc(db, 'users', authStore.user.uid);
//     await updateDoc(userDocRef, { cards });
//   }
// }

export const useCards = defineStore('cards', () => {
  const cards: Ref<Card[]> = useLocalStorage('cards', []);
  const isDialogCardVisible = ref(false);

  const cardsForShopping = computed((): Card[] => {
    return cards.value.length
      ? cards.value.filter((card) => card.isShoppingCard)
      : [];
  });

  async function addcard(card: Card) {
    return new Promise(async (resolve, reject) => {
      const cardFound = cards.value.find((el) => el.barcode === card.barcode);
      if (cardFound) {
        reject({ success: false, cardAlreadyExist: cardFound.shop.label });
      } else {
        cards.value.push(card);
        // Mets à jour firestore
        await updateDataFirestore(cards.value, 'cards');
        // send response
        resolve({ success: true });
      }
    });
  }

  async function removeCard(id: number) {
    cards.value = cards.value.filter((el) => el.id !== id);
    // Mets à jour firestore
    await updateDataFirestore(cards.value, 'cards');
  }

  async function editCard(card: Card) {
    const cardFound = cards.value.find((el) => el.id === card.id);
    if (cardFound) {
      Object.assign(cardFound, card);
      // Mets à jour firestore
      await updateDataFirestore(cards.value, 'cards');
    }
  }

  function showDialogCard() {
    isDialogCardVisible.value = true;
  }

  function hideDialogCard() {
    isDialogCardVisible.value = false;
  }

  return {
    cards,
    isDialogCardVisible,
    addcard,
    removeCard,
    editCard,
    showDialogCard,
    hideDialogCard,
    cardsForShopping,
  };
});
