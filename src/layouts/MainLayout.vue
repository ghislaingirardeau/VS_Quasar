<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLayout v-model="leftDrawerOpen" :is-theme-dark />

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
          <q-separator color="blue-grey-10" size="2px" />

          <q-select
            v-model="locale"
            :options="localeOptions"
            dense
            borderless
            emit-value
            map-options
            options-dense
            label="Lang"
            class="mt-5"
            @update:model-value="handleSelectChange()"
          ></q-select>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterLayout :key="locale" />
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
  mdiGrid,
  mdiLightbulb,
  mdiLightSwitch,
  mdiThemeLightDark,
  mdiToolbox,
} from '@quasar/extras/mdi-v7';

/* ----------- META ------------------ */

import { useMeta } from 'quasar';

useMeta({
  title: 'Tutorial',
  titleTemplate: (title) => `Quasar - ${title}`,
});

/* ---------------- i18n------------------- */

import { useI18n } from 'vue-i18n';
// import moment from 'moment';

// en changeant la valeur de locale, cela changera la langue directement
const { locale, availableLocales } = useI18n();
const i18n = useI18n();
console.log(i18n);

const localeOptions = ref([
  { value: 'en-US', label: 'English' },
  { value: 'fr', label: 'French' },
]);

import { moment } from 'boot/moment';
function handleSelectChange() {
  // A associer avec Key => pour un update des components moment
  moment.locale(locale.value);
}

/* --------------- DARK MODE -------------------- */
import { Dark } from 'quasar';
import FooterLayout from 'components/Layout/FooterLayout.vue';
import HeaderLayout from 'components/Layout/HeaderLayout.vue';

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
    label: 'Table',
    separator: false,
    to: {
      name: 'table',
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
  {
    icon: mdiToolbox,
    label: 'random',
    separator: false,
    to: {
      name: 'random',
    },
  },
]);

/* -------------- PROGRAMATIC ROUTING--------------------- */

const router = useRouter();

function handleLink(item) {
  console.log(item);
  if (item.to) {
    router.push(item.to);
  }
}
</script>
