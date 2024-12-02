import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Item } from 'src/types';
import { ref, Ref } from 'vue';

export const useItemList = defineStore('itemList', () => {
  const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', []);

  function handleDelete(id: string) {
    shoppingItems.value = shoppingItems.value.filter((el) => el.id !== id);
  }

  function handlePurchased(id: string) {
    const item = shoppingItems.value.find((el) => el.id === id);
    if (item) item.is_purchased = !item.is_purchased;
  }
  return {
    shoppingItems,
    handleDelete,
    handlePurchased,
  };
});
