<template>
  <q-btn
    size="sm"
    round
    :icon="mdiCartRemove"
    class="q-ml-sm text-white"
    @click="emptyCart"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiCartRemove } from '@quasar/extras/mdi-v7';
import { useShoppingItem } from 'src/stores/shoppingItems';
const shoppingList = useShoppingItem();

const { emptyCart } = shoppingList;
</script>

<style scoped></style>
