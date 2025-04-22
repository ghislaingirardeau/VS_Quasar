<template>
  <q-header elevated class="bg-primary text-white">
    <transition name="fade" mode="out-in">
      <q-toolbar :key="route.path">
        <HomeWidget />
        <q-toolbar-title class="ml-2">
          {{ title }}
        </q-toolbar-title>
        <transition-group name="fade" mode="out-in"
          ><component
            :is="component"
            v-for="(component, index) in componentsToLoad"
            :key="index"
          ></component
        ></transition-group>
      </q-toolbar>
    </transition>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';
import DownloadWidget from 'src/components/home/DownloadWidget.vue';
import AuthentificationWidget from 'src/components/home/AuthentificationWidget.vue';
// import NotificationWidget from 'src/components/shopping/NotificationWidget.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import HomeWidget from './HomeWidget.vue';
import AddListWidget from '../list/AddListWidget.vue';
import AddItemWidget from 'src/components/list/AddItemWidget.vue';
import AddCardWidget from '../cards/AddCardWidget.vue';
import WebAuthWidget from '../home/webAuthWidget.vue';

const route = useRoute();

const title = computed(() => {
  return route.meta.title || window.history.state?.name;
});

const componentsToLoad = computed(() => {
  switch (route.name) {
    case 'lists':
      return [AddListWidget];
    case 'list-id':
      return [AddItemWidget];
    case 'wallet':
      return [AddCardWidget];
    case 'wallet-id':
      return [];
    case 'shopping':
      return [EmptyCartWidget, CleanCartWidget, ShoppingCartWidget];
    default:
      return [DownloadWidget, AuthentificationWidget, WebAuthWidget];
  }
});
</script>

<style scoped></style>
