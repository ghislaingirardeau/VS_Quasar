<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ $t('layout.title') }}</q-toolbar-title>
        <q-space />

        <q-btn stretch flat :label="$t('layout.language')" />
        <q-btn
          :icon="isThemeDark ? mdiMoonFirstQuarter : mdiSunAngle"
          @click="Dark.toggle()"
        />
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
            <q-item exact :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator v-if="menuItem.separator" :key="'sep' + index" />
          </template>
          <q-separator />

          <q-select
            v-model="locale"
            :options="localeOptions"
            dense
            borderless
            emit-value
            map-options
            options-dense
            label="Lang"
          ></q-select>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar class="flex-center">
        <q-btn icon="person" size="lg" color="warning" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
  mdiGrid,
  mdiLightbulb,
  mdiLightSwitch,
  mdiMoonFirstQuarter,
  mdiSunAngle,
  mdiThemeLightDark,
} from '@quasar/extras/mdi-v7';

/* ----------- META ------------------ */

import { useMeta } from 'quasar';

useMeta({
  title: 'Tutorial',
  titleTemplate: (title) => `Quasar - ${title}`,
});

/* ---------------- i18n------------------- */

import { useI18n } from 'vue-i18n';

// en changeant la valeur de locale, cela changera la langue directement
const { locale, availableLocales } = useI18n();
const i18n = useI18n();
console.log(i18n);

const localeOptions = ref([
  { value: 'en-US', label: 'English' },
  { value: 'fr', label: 'French' },
]);

/* --------------- DARK MODE -------------------- */
import { Dark } from 'quasar';

const isThemeDark = computed(() => {
  return Dark.isActive;
});

/* --------------- MENU -------------------- */

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
    icon: 'list',
    label: 'list',
    separator: false,
    to: {
      name: 'list',
    },
  },
  {
    icon: mdiGrid,
    label: 'grid',
    separator: false,
    to: {
      name: 'grid',
    },
  },
]);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

/* -------------- PROGRAMATIC ROUTING--------------------- */

const router = useRouter();

function handleLink(item) {
  console.log(item);
  if (item.to) {
    router.push(item.to);
  }
}
</script>
