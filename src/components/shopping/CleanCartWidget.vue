<template>
  <q-btn
    size="sm"
    round
    :icon="mdiBasketRemove"
    class="q-ml-lg text-white"
    @click="emit('cleanCart')"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiBasketRemove } from '@quasar/extras/mdi-v7';
const emit = defineEmits(['cleanCart']);
</script>

<style scoped></style>
