<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <HomeWidget />
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <!-- <q-space /> -->
      <div v-if="isShoppingPage">
        <ConnectionWidget />
        <!-- <NotificationWidget /> -->
        <DownloadWidget />
        <EmptyCartWidget @empty-cart="emptyCart" />
        <CleanCartWidget @clean-cart="cleanCart" />
        <ShoppingCartWidget />
      </div>
      <div v-if="isListsPage">
        <AddListWidget />
      </div>
      <div v-if="isListPage">
        <AddItemWidget />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { useShoppingItem } from 'src/stores/shoppingItems';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';
import DownloadWidget from 'src/components/shopping/DownloadWidget.vue';
// import NotificationWidget from 'src/components/shopping/NotificationWidget.vue';
import ConnectionWidget from 'src/components/shopping/ConnectionWidget.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import HomeWidget from './HomeWidget.vue';
import AddListWidget from '../list/AddListWidget.vue';
import AddItemWidget from 'src/components/list/AddItemWidget.vue';

const route = useRoute();

const shoppingList = useShoppingItem();

const { emptyCart, cleanCart } = shoppingList;

const title = computed(() => {
  return route.meta.title || window.history.state?.name;
});

const isShoppingPage = computed(() => {
  return route.name === 'shopping';
});

const isListsPage = computed(() => {
  return route.name === 'lists';
});

const isListPage = computed(() => {
  return route.name === 'list-id';
});
</script>

<style scoped></style>
