<template>
  <q-layout view="hHh lpR fFf">
    <q-bar class="bg-blue-2 q-pa-lg">
      <h4 class="title">Shopping List</h4>
      <q-space />
      <EmptyCartWidget @empty-cart="emptyCart" />
      <ShoppingCartWidget />
    </q-bar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { Item } from 'src/types';
import { Ref } from 'vue';

const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', []);

function emptyCart() {
  shoppingItems.value = [];
}
</script>

<style scoped></style>
