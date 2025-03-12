<template>
  <q-btn
    size="sm"
    round
    :icon="mdiCardPlus"
    class="q-ml-sm text-white"
    @click="showDialogNewList"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiCardPlus } from '@quasar/extras/mdi-v7';
const emit = defineEmits(['showDialogNewList']);

function showDialogNewList() {
  emit('showDialogNewList');
}
</script>

<style scoped></style>
