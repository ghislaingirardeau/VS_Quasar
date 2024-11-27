<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        {{ $t('layout.title') }}
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
import { useAuth } from 'src/stores/auth';
import { useRouter } from 'vue-router';
const leftDrawerOpen = defineModel('drawer', { type: Boolean });
const themeSelected = defineModel('theme', { type: String });

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
