<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        {{ $t('layout.title') }}
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
</template>

<script setup lang="ts">
import {
  mdiLogout,
  mdiMoonFirstQuarter,
  mdiSunAngle,
} from '@quasar/extras/mdi-v7';
import { Dark } from 'quasar';
import { useAuth } from 'stores/auth';
import { useRouter } from 'vue-router';
const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean });

defineProps(['isThemeDark']);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

/* -------------- AUTH--------------------- */

const router = useRouter();

const auth = useAuth();

async function handleLogout() {
  await auth.logout();
  router.push({ name: 'login' });
}
</script>

<style scoped></style>
