<template>
  <q-layout view="hHh lpR fFf">
    <LayoutHeader />

    <q-page-container>
      {{ isRefreshing }}
      <router-view v-slot="{ Component }">
        <transition
          :name="(route.meta.transition as string) || 'fade'"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <transition name="fade" mode="out-in">
        <SaveWidget ref="save-widget-ref" :key="route.path" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import SaveWidget from 'src/components/layouts/SaveWidget.vue';
import { onMounted, useTemplateRef } from 'vue';
import { Notify } from 'quasar';
import { updateGlobalDataFirestore } from 'utils/firestore';
import { useRoute } from 'vue-router';
import { isRefreshing } from 'src/utils/useRefresh';

const saveWidgetRef = useTemplateRef('save-widget-ref');
const route = useRoute();

onMounted(() => {
  serviceWorkerSyncListener();
});

/**
 Ecoute le message PROCESS_FIRESTORE_QUEUE depuis custom-service-worker, du service worker pour synchroniser les données Firestore
 */
function serviceWorkerSyncListener() {
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
        saveWidgetRef.value!.isSyncPending = false;
      } catch (err) {
        console.error('Erreur Firestore:', err);
        return; // stop ici, on réessaiera plus tard
      }
    }
  });
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(15px);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}
</style>
