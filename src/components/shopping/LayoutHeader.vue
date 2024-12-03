<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title> Shopping List </q-toolbar-title>
      <!-- <q-space /> -->
      <EmptyCartWidget @empty-cart="emptyCart" />
      <ShoppingCartWidget />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { useItemList } from 'src/stores/itemList';

const itemList = useItemList();

const { emptyCart } = itemList;
</script>

<style scoped></style>
