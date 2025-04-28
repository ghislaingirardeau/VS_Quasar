<template>
  <q-layout view="hHh lpR fFf" :theme="themeSelected">
    <HeaderLayout
      :key="`header-${locale}`"
      v-model:drawer="leftDrawerOpen"
      v-model:theme="themeSelected"
      :is-theme-dark
    />

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      elevated
      :width="200"
      :breakpoint="700"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item exact :to="menuItem.to" active-class="text-primary">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator v-if="menuItem.separator" :key="'sep' + index" />
          </template>
          <q-separator color="primary" size="2px" />

          <q-select
            v-model="locale"
            :options="localeOptions"
            dense
            borderless
            emit-value
            map-options
            options-dense
            label="Lang"
            class="mt-5 mx-2"
            @update:model-value="handleSelectChange()"
          ></q-select>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container :key="themeSelected">
      <router-view />
    </q-page-container>

    <FooterLayout :key="`footer-${locale}`" />
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
  mdiGrid,
  mdiLightbulb,
  mdiLightSwitch,
  mdiShopping,
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
console.log(locale.value);

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
import FooterLayout from 'components/tuto/Layout/FooterLayout.vue';
import HeaderLayout from 'components/tuto/Layout/HeaderLayout.vue';

const isThemeDark = computed(() => {
  return Dark.isActive;
});

/* --------------- MENU -------------------- */

const leftDrawerOpen = ref(false);
const themeSelected = ref('Default');
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
    icon: 'description',
    label: 'form Creation',
    separator: false,
    to: {
      name: 'formCreation',
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
  {
    icon: mdiShopping,
    label: 'shopping',
    separator: false,
    to: {
      name: 'shopping',
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
