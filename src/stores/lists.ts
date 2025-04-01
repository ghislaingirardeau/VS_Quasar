import { useLocalStorage } from '@vueuse/core/index.cjs';
import { defineStore } from 'pinia';
import { List, FormList, Item } from 'src/types/lists';
import { computed, ref, Ref } from 'vue';
import { updateDataFirestore } from 'src/utils/firestore';

export const useLists = defineStore('lists', () => {
  const lists: Ref<List[]> = useLocalStorage('lists', []);
  const isNewListDialogVisible = ref(false);

  const totalItems = computed(() => {
    return lists.value.length;
  });

  async function deleteList(id: number) {
    return new Promise(async (resolve, reject) => {
      lists.value = lists.value.filter((el) => el.id !== id);
      // Mets à jour firestore
      await updateDataFirestore(lists.value, 'lists');
      resolve({ success: true });
    });
  }

  async function addList(list: FormList): Promise<{ success: boolean }> {
    return new Promise(async (resolve, reject) => {
      const findListWithSameName = lists.value.find(
        (el) => el.name.toLowerCase() === list.name.toLowerCase(),
      );
      if (findListWithSameName) {
        reject({ success: false, nameAlreadyUsed: findListWithSameName.name });
      } else {
        lists.value.push({ ...list, items: [] });
        // Mets à jour firestore
        await updateDataFirestore(lists.value, 'lists');
        // send response
        resolve({ success: true });
      }
    });
  }

  async function addItemInList(item: Item): Promise<{ success: boolean }> {
    return new Promise(async (resolve, reject) => {
      const findList = lists.value.find((el) => el.id === item.list_id);
      if (findList) {
        findList.items.push({ ...item });
        // Mets à jour firestore
        await updateDataFirestore(lists.value, 'lists');
        resolve({ success: true });
      } else {
        reject({ success: false, message: 'Can not add item to this list' });
      }
    });
  }

  async function updateItemInList(listId: number, value: Item[]) {
    const listToUpdate = lists.value.find((list) => list.id === listId);
    listToUpdate!.items = value;
  }

  function findListById(id: number): List | undefined {
    return lists.value.find((el) => el.id === id);
  }

  function reorderList(listId: number) {
    lists.value = lists.value.sort((a, b) => (a.id === listId ? -1 : 0));
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
    reorderList,
    updateItemInList,
    addItemInList,
    showDialogNewList,
    hideNewListDialog,
    findListById,
  };
});
