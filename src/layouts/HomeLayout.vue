<template>
  <q-layout view="hHh lpR fFf">
    <transition name="fade">
      <LayoutHeader :key="route.path" />
    </transition>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y">
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

const saveWidgetRef = useTemplateRef('save-widget-ref');
const route = useRoute();

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-y-enter-active,
.fade-slide-y-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-slide-y-enter-from,
.fade-slide-y-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
</style>
