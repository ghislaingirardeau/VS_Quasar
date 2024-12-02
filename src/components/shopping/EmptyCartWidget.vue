<template>
  <q-btn
    size="lg"
    flat
    :icon="mdiTrashCan"
    class="q-ml-lg text-grey-8"
    @click="emit('emptyCart')"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiTrashCan } from '@quasar/extras/mdi-v7';
const emit = defineEmits(['emptyCart']);
</script>

<style scoped></style>
