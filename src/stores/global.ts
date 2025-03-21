import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';

export const useGlobal = defineStore('globalStore', () => {
  const isDialogDeleteVisible = ref(false);

  function showDeleteDialog() {
    isDialogDeleteVisible.value = true;
  }

  function hideDeleteDialog() {
    isDialogDeleteVisible.value = false;
  }

  return {
    isDialogDeleteVisible,
    hideDeleteDialog,
    showDeleteDialog,
  };
});
