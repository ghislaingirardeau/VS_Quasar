<template>
  <q-btn
    size="sm"
    round
    :icon="mdiCartRemove"
    class="q-ml-sm text-white"
    @click="emit('emptyCart')"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiCartRemove } from '@quasar/extras/mdi-v7';
const emit = defineEmits(['emptyCart']);
</script>

<style scoped></style>
