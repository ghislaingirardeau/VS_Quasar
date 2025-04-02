<template>
  <div>
    {{ userName }}
    <q-btn
      size="sm"
      round
      :icon="mdiAccountPlus"
      class="q-ml-sm text-white"
      @click="signInWithGoogle"
    >
    </q-btn>
    <q-btn
      size="sm"
      round
      :icon="mdiLogin"
      class="q-ml-sm text-white"
      @click="logout"
    >
    </q-btn>

    <!-- <q-btn
      v-if="authenticateButton"
      size="sm"
      round
      :loading="loading"
      :icon="mdiLogin"
      class="q-ml-sm text-white"
      @click="handleAuthenticate"
    >
    </q-btn>
    <q-btn
      v-if="deleteButton"
      size="sm"
      round
      :loading="loading"
      color="red-5"
      :icon="mdiTrashCanOutline"
      class="q-ml-sm text-white"
      @click="removeCredential"
    >
    </q-btn> -->
    <q-dialog v-model="dialogSign">
      <q-card>
        <q-card-section>
          <div class="text-h6">Authentification</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ dialogInformationMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { mdiAccountPlus, mdiLogin } from '@quasar/extras/mdi-v7';
import { ref, computed, onMounted } from 'vue';
import { signInWithGoogle, logout } from 'src/boot/firebase';
import { storeToRefs } from 'pinia';
// import { useCards } from 'src/stores/card';
// import { useLists } from 'src/stores/lists';
// import { useShoppingItem } from 'src/stores/shoppingItems';
import { useAuth } from 'src/stores/auth';

const dialogSign = ref(false);
const dialogInformationMessage = ref('');
const auth = useAuth();
const { user } = storeToRefs(auth);

const userName = computed(() => {
  return user.value ? user.value.displayName : '';
});

onMounted(() => {
  window.addEventListener('beforeunload', () => {
    if (navigator.serviceWorker.controller) {
      // const listsStore = useLists();
      // const cardsStore = useCards();
      // const shoppingStore = useShoppingItem();
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SAVE_TO_FIRESTORE',
          payload: {
            lists: 'tests',
            userUid: 'ikySwLfqboQpBh4eDZQeGc87k0F3',
          },
        });
      }
    }
  });
});
</script>

<style scoped></style>
