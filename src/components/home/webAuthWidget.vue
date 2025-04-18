<template>
  <div class="webauthn-container">
    <q-btn
      v-if="isConnected || isLoggedIn"
      size="sm"
      round
      :icon="mdiLogout"
      class="q-ml-sm text-red-500"
      @click="logoutWebAuth"
    >
    </q-btn>
    <q-btn
      v-else
      size="sm"
      round
      :icon="mdiFingerprint"
      class="q-ml-sm text-yellow-500"
      @click="initWebAuth"
    >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { mdiFingerprint, mdiLogout } from '@quasar/extras/mdi-v7';
import { useWebAuth } from 'utils/useWebAuth';
import { logout } from 'src/boot/firebase';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { user, hasWebAuthRegister } = storeToRefs(auth);

const isLoading = ref(false);
const message = ref('');
const isLoggedIn = ref(false);

const isConnected = computed(() => {
  return user.value !== null;
});

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
  message.value = '';

  const result = await useWebAuth.registerCredential();

  message.value = result.message;

  if (result.success) {
    // le localstorage enregistre le fait que l'utilisateur a deja fait une demande de registration
    hasWebAuthRegister.value = true;
  }
  isLoading.value = false;
}

async function login() {
  isLoading.value = true;
  message.value = '';

  const result = await useWebAuth.loginWithCredential();

  message.value = result.message;

  if (result.success) {
    isLoggedIn.value = true;
  }
  isLoading.value = false;
}

async function logoutWebAuth() {
  // disconnect from firebase
  await logout();
  // disconnect from server
  await useWebAuth.logout();
  isLoggedIn.value = false;
}
</script>
