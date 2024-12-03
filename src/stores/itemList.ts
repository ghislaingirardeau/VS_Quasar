import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Item } from 'src/types';
import { computed, Ref } from 'vue';

export const useItemList = defineStore('itemList', () => {
  const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', []);

  const totalItems = computed(() => {
    return shoppingItems.value.filter((el) => !el.is_purchased).length;
  });

  function handleDelete(id: string) {
    shoppingItems.value = shoppingItems.value.filter((el) => el.id !== id);
  }

  function handlePurchased(id: string) {
    const item = shoppingItems.value.find((el) => el.id === id);
    if (item) item.is_purchased = !item.is_purchased;
  }
  function addToShoppingList(item: Item) {
    const isItemInList = shoppingItems.value.find(
      (el) => el.title.toLowerCase() === item.title.toLowerCase(),
    );
    if (!isItemInList) {
      shoppingItems.value.push(item);
      shoppingItems.value.sort(function (a: Item, b) {
        return a?.category.id - b?.category.id;
      });
    }
  }
  function emptyCart() {
    shoppingItems.value = [];
  }
  function cleanCart() {
    shoppingItems.value = shoppingItems.value.filter((el) => !el.is_purchased);
  }
  return {
    shoppingItems,
    totalItems,
    handleDelete,
    handlePurchased,
    addToShoppingList,
    emptyCart,
    cleanCart,
  };
});
