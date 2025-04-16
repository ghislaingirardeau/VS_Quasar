<template>
  <q-btn
    v-if="user && !isShoppingPage"
    class="fixed fixed-bottom-right mr-5 mb-5"
    :color="iconColor"
    :icon="iconType"
    round
    float
    :loading="isSaving || isFetchingData"
    @click="saveToFirestore"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiSync, mdiTimerSyncOutline } from '@quasar/extras/mdi-v7';
import { useOnline } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { useAuth } from 'src/stores/auth';
import { updateGlobalDataFirestore } from 'utils/firestore';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const auth = useAuth();
const { user, isFetchingData } = storeToRefs(auth);
const isSaving = ref(false);
const isSyncPending = ref(false);
const route = useRoute();

const online = useOnline();

const isShoppingPage = computed(() => {
  return route.name === 'shopping';
});

const iconType = computed(() => {
  return isSyncPending.value ? mdiTimerSyncOutline : mdiSync;
});

const iconColor = computed(() => {
  return isSyncPending.value ? 'warning' : 'secondary';
});

async function saveToFirestore() {
  isSaving.value = true;

  if (online.value) {
    await updateGlobalDataFirestore();
  } else {
    isSyncPending.value = true;
    // Si l'utilisateur est hors ligne, envoie l'instruction au service worker pour qu'il fasse la syncro plus tard (une fois en ligne)
    // "sync-firestore" est le tag attendu par custom-service-worker pour préparer la syncro
    const sw = await navigator.serviceWorker.ready;
    await sw.sync.register('sync-firestore');

    Notify.create({
      message: 'Hors ligne : données enregistrées localement',
      color: 'warning',
      icon: 'cloud_off',
    });
  }
  isSaving.value = false;
}

defineExpose({
  isSaving,
  isSyncPending,
});
</script>

<style scoped></style>
