<template>
  <div class="webauthn-container">
    <q-btn
      v-if="isConnected"
      size="sm"
      round
      :icon="mdiLogout"
      class="q-ml-sm text-red-500"
      @click="logoutWebAuth"
    >
    </q-btn>
    <q-btn
      v-else-if="!isRegister"
      size="sm"
      round
      :icon="mdiAccountPlus"
      class="q-ml-sm text-yellow-500"
      @click="register"
    >
    </q-btn>
    <q-btn
      v-else
      size="sm"
      round
      :icon="mdiLogin"
      class="q-ml-sm text-yellow-500"
      @click="login"
    >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { mdiAccountPlus, mdiLogin, mdiLogout } from '@quasar/extras/mdi-v7';
import { useWebAuth } from 'utils/useWebAuth';
import { logout } from 'src/boot/firebase';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { user } = storeToRefs(auth);

const isLoading = ref(false);
const message = ref('');
const isLoggedIn = ref(false);
const isRegister = ref(false);

const isConnected = computed(() => {
  return user.value !== null;
});

onMounted(async () => {
  const result = await useWebAuth.isAuthentificate();
  if (result.user) isLoggedIn.value = true;
});

async function register() {
  isLoading.value = true;
  message.value = '';

  const result = await useWebAuth.registerCredential();

  message.value = result.message;

  if (result.success) {
    isRegister.value = true;
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
