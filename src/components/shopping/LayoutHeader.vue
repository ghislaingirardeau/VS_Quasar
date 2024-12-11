<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title> Shopping List </q-toolbar-title>
      <!-- <q-space /> -->
      <ConnectionWidget />
      <NotificationWidget />
      <DownloadWidget />
      <AuthentificationWidget />
      <EmptyCartWidget @empty-cart="emptyCart" />
      <CleanCartWidget @clean-cart="cleanCart" />
      <ShoppingCartWidget />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import { useItemList } from 'src/stores/itemList';
import CleanCartWidget from './CleanCartWidget.vue';
import DownloadWidget from './DownloadWidget.vue';
import NotificationWidget from './NotificationWidget.vue';
import ConnectionWidget from './ConnectionWidget.vue';
import AuthentificationWidget from './AuthentificationWidget.vue';

const itemList = useItemList();

const { emptyCart, cleanCart } = itemList;
</script>

<style scoped></style>
