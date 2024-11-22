<template>
  <router-view />
  <!-- <div v-else style="height: 100vh" class="flex flex-center">
    <q-btn
      label="Login"
      :icon="mdiLogin"
      color="primary"
      :loading="auth.logging"
      @click="auth.login()"
    />
  </div> -->
</template>

<script setup lang="ts">
// import { mdiLogin } from '@quasar/extras/mdi-v7';
// import { useAuth } from './stores/auth';

// const auth = useAuth();
// nom du fichier qui sera rendu dans devtool
defineOptions({
  name: 'App',
});
</script>
