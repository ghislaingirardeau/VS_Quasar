<template>
  <q-icon size="md" flat :name="mdiCart" class="q-ml-lg text-grey-8">
    <q-badge rounded color="red" floating>{{ totalItems }}</q-badge>
  </q-icon>
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
