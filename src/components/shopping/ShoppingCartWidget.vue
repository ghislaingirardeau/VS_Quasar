<template>
  <q-icon size="md" flat :name="mdiCart" class="q-ml-lg text-white">
    <q-badge rounded color="red" floating>{{ totalItems }}</q-badge>
  </q-icon>
</template>

<script setup lang="ts">
import { mdiCart } from '@quasar/extras/mdi-v7';
import { storeToRefs } from 'pinia';
import { useItemList } from 'src/stores/itemList';

const itemList = useItemList();

const { totalItems } = storeToRefs(itemList);

// To display badges inside app icon
if (navigator.setAppBadge) {
  navigator.setAppBadge(totalItems.value);
}
</script>

<style scoped></style>
