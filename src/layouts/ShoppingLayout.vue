<template>
  <q-layout view="hHh lpR fFf">
    <q-bar class="bg-blue-5 q-pa-lg">
      <h4>Shopping List</h4>
      <q-space />
      <q-btn size="md" flat :icon="mdiCart" class="q-ml-lg">
        <q-badge rounded color="red" floating>{{ totalItems }}</q-badge>
      </q-btn>
    </q-bar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { mdiCart } from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { Item } from 'src/types/index';
import { computed, Ref } from 'vue';

const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', []);

const totalItems = computed(() => {
  return shoppingItems.value.filter((el) => !el.is_purchased).length;
});
</script>

<style scoped></style>
