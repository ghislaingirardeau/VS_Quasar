<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title> {{ route.meta.title }} </q-toolbar-title>
      <!-- <q-space /> -->
      <div v-if="isShoppingPage">
        <ConnectionWidget />
        <NotificationWidget />
        <DownloadWidget />
        <EmptyCartWidget @empty-cart="emptyCart" />
        <CleanCartWidget @clean-cart="cleanCart" />
        <ShoppingCartWidget />
      </div>
      <div v-if="isListPage">add</div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { useShoppingItem } from 'src/stores/shoppingItems';
import CleanCartWidget from './CleanCartWidget.vue';
import DownloadWidget from './DownloadWidget.vue';
import NotificationWidget from './NotificationWidget.vue';
import ConnectionWidget from './ConnectionWidget.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const itemList = useShoppingItem();

const { emptyCart, cleanCart } = itemList;

const isShoppingPage = computed(() => {
  return route.name === 'shopping';
});

const isListPage = computed(() => {
  return route.name === 'list';
});
</script>

<style scoped></style>
