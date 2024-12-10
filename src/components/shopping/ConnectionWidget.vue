<template>
  <q-btn
    v-if="!online"
    size="sm"
    round
    :icon="mdiWifiOff"
    color="red-5"
    class="q-ml-sm text-white"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiWifiOff } from '@quasar/extras/mdi-v7';
import { useOnline } from '@vueuse/core';

const online = useOnline();
</script>

<style scoped></style>
