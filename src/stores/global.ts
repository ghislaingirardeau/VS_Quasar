import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from 'src/boot/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Utilisateur connecté:', user);
  } else {
    console.log('Utilisateur déconnecté');
  }
});

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
