<template>
  <q-bar class="bg-blue-2 q-pa-lg">
    <h4 class="title">Shopping List</h4>
    <q-space />
    <EmptyCartWidget @empty-cart="emptyCart" />
    <ShoppingCartWidget />
  </q-bar>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { useItemList } from 'src/stores/itemList';

const itemList = useItemList();

const { emptyCart } = itemList;
</script>

<style scoped></style>
