<template>
  <q-btn
    v-if="deferredPrompt"
    size="sm"
    round
    :icon="mdiDownload"
    class="q-ml-sm text-white"
    @click="handlePromptInstall"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiDownload } from '@quasar/extras/mdi-v7';
import { Ref, ref } from 'vue';
const deferredPrompt: Ref<any | null> = ref(null);

window.addEventListener('beforeinstallprompt', (e: Event) => {
  e.preventDefault();
  deferredPrompt.value = e;
  console.log("'beforeinstallprompt' event was fired.");
});

async function handlePromptInstall() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
  }
}
</script>

<style scoped></style>
