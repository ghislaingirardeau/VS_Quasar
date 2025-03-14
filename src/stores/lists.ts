import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { List } from 'src/types';
import { computed, ref, Ref } from 'vue';

export const useLists = defineStore('lists', () => {
  const lists: Ref<List[]> = useLocalStorage('lists', []);
  const isNewListDialogVisible = ref(false);

  const totalItems = computed(() => {
    return lists.value.length;
  });

  async function deleteList(id: number) {
    return new Promise((resolve, reject) => {
      lists.value = lists.value.filter((el) => el.id !== id);
      resolve({ success: true });
    });
  }

  async function addList(list: List): Promise<{ success: boolean }> {
    return new Promise((resolve, reject) => {
      const findListWithSameName = lists.value.find(
        (el) => el.name.toLowerCase() === list.name.toLowerCase(),
      );
      if (findListWithSameName) {
        reject({ success: false, nameAlreadyUsed: findListWithSameName.name });
      } else {
        lists.value.push({ ...list });
        resolve({ success: true });
      }
    });
  }

  function findListById(id: number): List | undefined {
    console.log(id);
    return lists.value.find((el) => el.id === id);
  }

  function cleanList() {
    lists.value = [];
  }

  function showDialogNewList() {
    isNewListDialogVisible.value = true;
  }

  function hideNewListDialog() {
    isNewListDialogVisible.value = false;
  }
  return {
    lists,
    isNewListDialogVisible,
    totalItems,
    deleteList,
    addList,
    cleanList,
    showDialogNewList,
    hideNewListDialog,
    findListById,
  };
});
