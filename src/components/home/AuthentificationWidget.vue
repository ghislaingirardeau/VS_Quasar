<template>
  <div>
    <q-btn
      v-if="loggedIn"
      size="sm"
      round
      :icon="mdiLogout"
      class="q-ml-sm text-white"
      @click="useFirebaseAuth.logout"
    >
    </q-btn>
    <q-btn
      v-else
      size="sm"
      round
      :icon="mdiAccountPlus"
      class="q-ml-sm text-white"
      @click="useFirebaseAuth.signInWithGoogle"
    >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { mdiAccountPlus, mdiLogout } from '@quasar/extras/mdi-v7';
import { useFirebaseAuth } from 'utils/useFirebaseAuth';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { loggedIn } = storeToRefs(auth);

/* onMounted(() => {
  window.addEventListener('beforeunload', () => {
    if (navigator.serviceWorker.controller) {
      const listsStore = useLists();
      // const cardsStore = useCards();
      // const shoppingStore = useShoppingItem();

      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SAVE_TO_FIRESTORE',
          payload: {
            lists: JSON.parse(JSON.stringify(listsStore.lists)),
            userUid: 'ikySwLfqboQpBh4eDZQeGc87k0F3',
          },
        });
      }
    }
  });
}); */
</script>

<style scoped></style>
