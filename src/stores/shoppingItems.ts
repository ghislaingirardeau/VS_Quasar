import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { ShoppingItem } from 'src/types/shopping';
import { updateShoppingDataFirestore } from 'utils/firestore';
import { computed, Ref } from 'vue';

export const useShoppingItem = defineStore('shoppingItem', () => {
  const shoppingItems: Ref<ShoppingItem[]> = useLocalStorage(
    'currentShopping',
    [],
  );

  const shoppingsData: Ref<ShoppingItem[]> = useLocalStorage(
    'shoppingsData',
    [],
  );

  const totalItems = computed(() => {
    return shoppingItems.value.filter((el) => !el.is_purchased).length;
  });

  function initShoppingDataFromFirestore(shoppingDataToUpdate: ShoppingItem[]) {
    shoppingsData.value = shoppingDataToUpdate;
  }

  function handleDelete(id: string) {
    shoppingItems.value = shoppingItems.value.filter((el) => el.id !== id);
  }

  function handlePurchased(id: string) {
    const item = shoppingItems.value.find((el) => el.id === id);
    if (item) item.is_purchased = !item.is_purchased;
  }
  function addToShoppingList(item: ShoppingItem) {
    const isItemInList = shoppingItems.value.find(
      (el) => el.title.toLowerCase() === item.title.toLowerCase(),
    );
    if (!isItemInList) {
      shoppingItems.value.push(item);
      shoppingItems.value.sort(function (a: ShoppingItem, b) {
        return a?.category.id - b?.category.id;
      });
    }
  }
  async function emptyCart() {
    shoppingItems.value = [];
    await updateShoppingDataFirestore();
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
    shoppingsData,
    initShoppingDataFromFirestore,
  };
});
