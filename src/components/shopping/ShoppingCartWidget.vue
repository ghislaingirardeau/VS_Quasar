<template>
  <q-icon
    size="md"
    flat
    :name="mdiCart"
    class="q-ml-lg text-white"
    @click="
      $router.push({ name: 'wallet', query: { showShoppingCard: 'true' } })
    "
  >
    <q-badge rounded color="red" floating>{{ totalItems }}</q-badge>
  </q-icon>
</template>

<script setup lang="ts">
import { mdiCart } from '@quasar/extras/mdi-v7';
import { storeToRefs } from 'pinia';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { onMounted } from 'vue';

const itemList = useShoppingItem();

const { totalItems } = storeToRefs(itemList);

onMounted(() => {
  // To display badges inside app icon
  if (navigator.setAppBadge) {
    navigator.setAppBadge(totalItems.value);
  }
});
</script>

<style scoped></style>
