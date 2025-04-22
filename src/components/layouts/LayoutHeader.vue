<template>
  <q-header elevated class="bg-primary text-white">
    <transition name="fade" mode="out-in">
      <q-toolbar :key="route.path">
        <HomeWidget />
        <q-toolbar-title class="ml-2">
          {{ title }}
        </q-toolbar-title>
        <transition-group
          appear
          name="fade-X"
          mode="out-in"
          tag="div"
          class="flex flex-center"
        >
          <component
            :is="component"
            v-for="(component, index) in componentsToLoad"
            :key="index"
            class="animated-component transition-all"
          ></component>
        </transition-group>
      </q-toolbar>
    </transition>
  </q-header>
</template>

<script setup lang="ts">
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';
import DownloadWidget from 'src/components/home/DownloadWidget.vue';
// import NotificationWidget from 'src/components/shopping/NotificationWidget.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import HomeWidget from './HomeWidget.vue';
import AddListWidget from '../list/AddListWidget.vue';
import AddItemWidget from 'src/components/list/AddItemWidget.vue';
import AddCardWidget from '../cards/AddCardWidget.vue';
// import AuthentificationHeader from '../home/AuthentificationsHeader.vue';
import AuthentificationWidget from 'src/components/home/AuthentificationWidget.vue';
import WebAuthWidget from '../home/webAuthWidget.vue';
import { useOnline } from '@vueuse/core';
import { useAuth } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import UserNameWidget from '../home/UserNameWidget.vue';

const route = useRoute();
const online = useOnline();
const auth = useAuth();
const { user, hasWebAuthRegister } = storeToRefs(auth);

const title = computed(() => {
  return route.meta.title || window.history.state?.name;
});

const isConnectedAndNotRegister = computed(() => {
  return (
    process.env.NODE_ENV === 'development' &&
    user.value !== null &&
    hasWebAuthRegister.value === false
  );
});

const isLogoutAndRegister = computed(() => {
  return (
    process.env.NODE_ENV === 'development' &&
    user.value === null &&
    hasWebAuthRegister.value === true
  );
});

/**
 * @description: For Home page and for transition group to work properly, we need to add a key to the component
 * the key is the index of the component in the array, so array length has to change to trigger the transition
 */
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
      if (online.value) {
        return isLogoutAndRegister.value || isConnectedAndNotRegister.value
          ? [
              DownloadWidget,
              UserNameWidget,
              AuthentificationWidget,

              WebAuthWidget,
            ]
          : [DownloadWidget, UserNameWidget, AuthentificationWidget];
      } else {
        return [DownloadWidget];
      }
  }
});
</script>

<style scoped>
.fade-X-move,
.fade-X-enter-active,
.fade-X-leave-active {
  transition: all 0.6s ease;
}
.fade-X-enter-from,
.fade-X-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.fade-X-enter-to,
.fade-X-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-X-leave-active {
  position: absolute;
  right: -10px;
}
</style>
