<template>
  <q-btn
    size="sm"
    round
    :icon="mdiPlusBox"
    class="q-ml-sm text-white"
    @click="showDialogNewList"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiPlusBox } from '@quasar/extras/mdi-v7';
import { useLists } from 'src/stores/lists';
const listsStore = useLists();
const { showDialogNewList } = listsStore;
</script>

<style scoped></style>
