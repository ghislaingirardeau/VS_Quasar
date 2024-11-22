<template>
  <div style="height: 100vh" class="flex flex-center">
    <q-btn
      label="Login"
      :icon="mdiLogin"
      color="primary"
      :loading="auth.logging"
      @click="handleLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { mdiLogin } from '@quasar/extras/mdi-v7';
import { useAuth } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

async function handleLogin() {
  await auth.login();
  router.push({ name: 'home' });
}
</script>

<style scoped></style>
