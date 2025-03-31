<template>
  <q-btn
    size="sm"
    round
    :icon="mdiBasketRemove"
    class="clean-card-widget q-ml-md text-white"
    @click="cleanCart"
  >
    <q-badge color="red" floating>{{ totalItems }}</q-badge>
  </q-btn>
</template>

<script setup lang="ts">
import { mdiBasketRemove } from '@quasar/extras/mdi-v7';
import { storeToRefs } from 'pinia';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { onMounted } from 'vue';
const shoppingList = useShoppingItem();

const { totalItems } = storeToRefs(shoppingList);

const { cleanCart } = shoppingList;

onMounted(() => {
  // To display badges inside app icon
  if (navigator.setAppBadge) {
    navigator.setAppBadge(totalItems.value);
  }
});
</script>

<style lang="scss">
.clean-card-widget {
  .q-badge--floating {
    right: -12px;
  }
}
</style>
