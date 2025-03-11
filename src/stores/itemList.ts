import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { Item } from 'src/types';
import { computed, Ref } from 'vue';

export const useItemList = defineStore('itemList', () => {
  const listItems: Ref<Item[]> = useLocalStorage('listItems', []);

  const totalItems = computed(() => {
    return listItems.value.length;
  });

  function deleteItem(id: number) {
    listItems.value = listItems.value.filter((el) => el.id !== id);
  }

  function addItem(item: Item) {
    listItems.value.push(item);
  }

  function cleanList() {
    listItems.value = [];
  }
  return {
    listItems,
    totalItems,
    deleteItem,
    addItem,
    cleanList,
  };
});
