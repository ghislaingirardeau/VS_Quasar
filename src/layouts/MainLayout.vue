<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar playground </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      elevated
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              v-ripple
              clickable
              :active="menuItem.label === 'Outbox'"
              @click="handleLink(menuItem)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator v-if="menuItem.separator" :key="'sep' + index" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar class="flex-center">
        <q-btn icon="person" size="lg" color="warning" class="global_border" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const leftDrawerOpen = ref(false);
const menuList = ref([
  {
    icon: 'home',
    label: 'Home',
    separator: true,
    to: {
      name: 'home',
    },
  },
  {
    icon: 'check',
    label: 'Todos - table',
    separator: false,
    to: {
      name: 'todos',
    },
  },
  {
    icon: 'description',
    label: 'form',
    separator: false,
    to: {
      name: 'form',
    },
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
  },
]);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function handleLink(item) {
  console.log(item);
  if (item.to) {
    router.push(item.to);
  }
}
</script>
