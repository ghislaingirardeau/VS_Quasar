import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Card } from 'src/types/cards';
import { computed, ref, Ref } from 'vue';

export const useCards = defineStore('cards', () => {
  const cards: Ref<Card[]> = useLocalStorage('cards', []);
  const isDialogCardVisible = ref(false);

  const cardsForShopping = computed((): Card[] => {
    return cards.value.length
      ? cards.value.filter((card) => card.isShoppingCard)
      : [];
  });

  async function addcard(card: Card) {
    const cardFound = cards.value.find(
      (el) => el.barcode.code === card.barcode.code,
    );
    if (cardFound) {
      throw new Error('Card already exists');
    } else {
      cards.value.push(card);
    }
  }

  async function removeCard(id: number) {
    cards.value = cards.value.filter((el) => el.id !== id);
  }

  async function editCard(card: Card) {
    const cardFound = cards.value.find((el) => el.id === card.id);
    if (cardFound) {
      Object.assign(cardFound, card);
      console.log('updated card');
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
