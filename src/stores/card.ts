import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Card } from 'src/types/cards';
import { ref, Ref } from 'vue';

export const useCards = defineStore('cards', () => {
  const cards: Ref<Card[]> = useLocalStorage('cards', []);
  const isDialogCardVisible = ref(false);

  function addcard(card: Card) {
    const cardFound = cards.value.find((el) => el.codeBar === card.codeBar);
    if (cardFound) {
      return;
    }
    cards.value.push(card);
  }

  function removeCard(id: number) {
    cards.value = cards.value.filter((el) => el.id !== id);
  }

  function editCard(card: Card) {
    const cardFound = cards.value.find((el) => el.id === card.id);
    if (cardFound) {
      Object.assign(cardFound, card);
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
  };
});
