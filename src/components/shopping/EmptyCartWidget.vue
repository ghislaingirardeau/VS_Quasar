<template>
  <q-btn
    size="sm"
    round
    :icon="mdiTrashCan"
    class="q-ml-lg text-white"
    @click="emit('emptyCart')"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiTrashCan } from '@quasar/extras/mdi-v7';
const emit = defineEmits(['emptyCart']);
</script>

<style scoped></style>
