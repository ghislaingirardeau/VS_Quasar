<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title ref="headerTitle">
        {{ $t('layout.welcome') }}
      </q-toolbar-title>
      <q-space />

      <q-select
        v-model="themeSelected"
        outlined
        label="Theme"
        :options="['default', 'elegant']"
      >
        <template #append>
          <q-icon name="event" color="white" />
        </template>
      </q-select>
      <AuthentificationWidget />
      <q-btn
        :icon="isThemeDark ? mdiMoonFirstQuarter : mdiSunAngle"
        flat
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
</template>

<script setup lang="ts">
import {
  mdiLogout,
  mdiMoonFirstQuarter,
  mdiSunAngle,
} from '@quasar/extras/mdi-v7';
import { Dark } from 'quasar';
import { useAuth } from 'src/stores/authTuto';
import { useRouter } from 'vue-router';
import { gsap } from 'src/boot/libraries';

const leftDrawerOpen = defineModel('drawer', { type: Boolean });
const themeSelected = defineModel('theme', { type: String });

// const headerTitle = useTemplateRef<HTMLInputElement>('headerTitle');
const headerTitle = ref<Ref | null>(null);

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

onMounted(() => {
  const elementTarget = headerTitle.value?.$el as HTMLDivElement;
  gsap.to(elementTarget, {
    duration: 2,
    text: { value: t('layout.title'), newClass: 'text-grey-6' },
    ease: 'none',
    delay: 1,
  });
});

/* -------------- HYDRATATION OR ASYNC COMPONENT--------------------- */

import { defineAsyncComponent, onMounted, Ref, ref } from 'vue';

const AuthentificationWidget = defineAsyncComponent(
  () => import('src/components/tuto/AuthentificationWidget.vue'),
);

defineProps({
  isThemeDark: Boolean,
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

/* -------------- AUTH--------------------- */

const router = useRouter();

const auth = useAuth();

async function handleLogout() {
  await auth.logout();
  router.push({ name: 'auth' });
}
</script>

<style scoped></style>
