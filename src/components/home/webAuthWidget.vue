<template>
  <q-btn
    size="sm"
    round
    :icon="mdiFingerprint"
    :loading="isFetchingData"
    class="q-ml-sm text-white"
    @click="initWebAuth"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { mdiFingerprint } from '@quasar/extras/mdi-v7';
import { useWebAuth } from 'utils/useWebAuth';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { hasWebAuthRegister, isFetchingData } = storeToRefs(auth);

const isLoading = ref(false);
const isLoggedIn = ref(false);

onMounted(async () => {
  const result = await useWebAuth.isAuthentificate();
  if (result.user) isLoggedIn.value = true;
});

async function initWebAuth() {
  // Vérifie dans le storage si webAuth existe déjà pour cet utilisateur
  // si oui, tu le login, sinon tu créées l'utilisateur via register
  if (hasWebAuthRegister.value) {
    await login();
  } else {
    await register();
  }
}

async function register() {
  isLoading.value = true;

  const result = await useWebAuth.registerCredential();

  if (result.success) {
    // le localstorage enregistre le fait que l'utilisateur a deja fait une demande de registration
    hasWebAuthRegister.value = true;
  }
  isLoading.value = false;
}

async function login() {
  isLoading.value = true;

  const result = await useWebAuth.loginWithCredential();

  if (result.success) {
    isLoggedIn.value = true;
  }
  isLoading.value = false;
}
</script>
