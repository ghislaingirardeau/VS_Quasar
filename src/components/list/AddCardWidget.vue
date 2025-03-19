<template>
  <q-btn
    size="sm"
    round
    :icon="mdiCreditCardPlusOutline"
    class="q-ml-sm text-white"
    @click="showDialogNewList"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiCreditCardPlusOutline } from '@quasar/extras/mdi-v7';
import { useLists } from 'src/stores/lists';
const listsStore = useLists();
const { showDialogNewList } = listsStore;
</script>

<style scoped></style>
