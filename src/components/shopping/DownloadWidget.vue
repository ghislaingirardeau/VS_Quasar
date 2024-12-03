<template>
  <q-btn
    v-if="hasToInstall"
    size="sm"
    round
    :icon="mdiDownload"
    class="q-ml-lg text-white"
    @click="handlePromptInstall"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiDownload } from '@quasar/extras/mdi-v7';
import { Ref, ref } from 'vue';
const deferredPrompt: Ref<any | null> = ref(null);
const hasToInstall = ref(false);

const handleInstallPrompt = (e: Event) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt.value = e;
  // Update UI notify the user they can install the PWA
  // Optionally, send analytics event that PWA install promo was shown.
  console.log("'beforeinstallprompt' event was fired.");
  hasToInstall.value = true;
};

window.addEventListener('beforeinstallprompt', handleInstallPrompt);

async function handlePromptInstall() {
  // Hide the app provided install promotion
  // Show the install prompt
  deferredPrompt.value.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.value.userChoice;

  console.log(outcome);

  if (outcome !== 'dismissed') {
    hasToInstall.value = false;
  }
  deferredPrompt.value = null;
}
</script>

<style scoped></style>
