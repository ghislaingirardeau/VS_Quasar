<template>
  <q-btn
    v-if="deferredPrompt && !isInstalled"
    size="sm"
    round
    :icon="mdiDownload"
    class="q-ml-sm text-white mr-2"
    @click="handlePromptInstall"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { mdiDownload } from '@quasar/extras/mdi-v7';
import { onMounted, Ref, ref } from 'vue';

const deferredPrompt: Ref<any | null> = ref(null);
const isInstalled = ref(false);

async function handlePromptInstall() {
  if (deferredPrompt.value) {
    await deferredPrompt.value.prompt();
    const choiceResult = await deferredPrompt.value.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted PWA install');
    } else {
      console.log('User dismissed PWA install');
    }
    deferredPrompt.value = null;
  }
}

onMounted(() => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    isInstalled.value = true;
  }

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    console.log('beforeinstallprompt event triggered.');
    e.preventDefault();
    deferredPrompt.value = e;
    Notify.create({
      message: "Télécharger l'application sur votre mobile ?",
      color: 'primary',
      icon: 'download',
      timeout: 5000,
      actions: [
        {
          label: 'Télécharger',
          color: 'white',
          handler: () => {
            handlePromptInstall();
          },
        },
      ],
    });
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed.');
    isInstalled.value = true;
  });
});
</script>

<style scoped></style>
