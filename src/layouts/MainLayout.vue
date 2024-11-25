<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          {{ $t('layout.title') }} {{ moment().format('dddd') }}
        </q-toolbar-title>
        <q-space />

        <q-btn stretch flat :label="$t('layout.language')" />
        <q-btn
          :icon="isThemeDark ? mdiMoonFirstQuarter : mdiSunAngle"
          @click="Dark.toggle()"
        />
        <q-btn
          :icon="mdiLogout"
          class="mx-4"
          round
          flat
          :loading="auth.logging"
          @click="handleLogout"
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
  mdiLogout,
  mdiMoonFirstQuarter,
  mdiSunAngle,
  mdiThemeLightDark,
} from '@quasar/extras/mdi-v7';

/* ----------- Logout ------------------ */
import { useAuth } from 'stores/auth';

const auth = useAuth();

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
import FooterLayout from 'components/FooterLayout.vue';

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

/* -------------- AUTH--------------------- */

async function handleLogout() {
  await auth.logout();
  router.push({ name: 'login' });
}
</script>
