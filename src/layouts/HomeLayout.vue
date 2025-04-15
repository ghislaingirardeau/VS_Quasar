<template>
  <q-layout view="hHh lpR fFf">
    <LayoutHeader />

    <q-page-container>
      <router-view />
      <SaveWidget ref="save-widget-ref" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import SaveWidget from 'src/components/layouts/SaveWidget.vue';
import { onMounted, useTemplateRef } from 'vue';
import { Notify } from 'quasar';
import { updateGlobalDataFirestore } from 'utils/firestore';

const saveWidgetRef = useTemplateRef('save-widget-ref');

onMounted(() => {
  // Quand tu recois un message du service worker PROCESS_FIRESTORE_QUEUE depuis custom-service-worker, tu fais la syncro
  navigator.serviceWorker.addEventListener('message', async (event) => {
    if (event.data?.type === 'PROCESS_FIRESTORE_QUEUE') {
      try {
        saveWidgetRef.value!.isSaving = true;
        await updateGlobalDataFirestore(false);
        Notify.create({
          message: 'De nouveau en ligne : données synchronisées',
          color: 'secondary',
          icon: 'cloud_sync',
          timeout: 3000,
        });
        saveWidgetRef.value!.isSaving = false;
      } catch (err) {
        console.error('Erreur Firestore:', err);
        return; // stop ici, on réessaiera plus tard
      }
    }
  });
});
</script>

<style scoped></style>
