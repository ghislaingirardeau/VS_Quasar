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
      <div v-if="isListPage">
        <addItemWidget @show-dialog-new-list="showDialogNewList" />
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
import NotificationWidget from 'src/components/shopping/NotificationWidget.vue';
import ConnectionWidget from 'src/components/shopping/ConnectionWidget.vue';
import addItemWidget from 'src/components/list/AddItemWidget.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useLists } from 'src/stores/lists';

const route = useRoute();

const shoppingList = useShoppingItem();
const listsStore = useLists();

const { emptyCart, cleanCart } = shoppingList;

const { showDialogNewList } = listsStore;

const isShoppingPage = computed(() => {
  return route.name === 'shopping';
});

const isListPage = computed(() => {
  return route.name === 'list';
});
</script>

<style scoped></style>
