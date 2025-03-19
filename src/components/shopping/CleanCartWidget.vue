<template>
  <q-btn
    size="sm"
    round
    :icon="mdiBasketRemove"
    class="q-ml-sm text-white"
    @click="cleanCart"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiBasketRemove } from '@quasar/extras/mdi-v7';
import { useShoppingItem } from 'src/stores/shoppingItems';
const shoppingList = useShoppingItem();

const { cleanCart } = shoppingList;
</script>

<style scoped></style>
