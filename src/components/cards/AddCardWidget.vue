<template>
  <q-btn
    size="sm"
    round
    :icon="mdiCreditCardPlusOutline"
    class="q-ml-sm text-white"
    @click="showDialogCard"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiCreditCardPlusOutline } from '@quasar/extras/mdi-v7';
import { useCards } from 'src/stores/card';
const cardsStore = useCards();
const { showDialogCard } = cardsStore;
</script>

<style scoped></style>
