<template>
  <div>
    <q-btn
      v-if="loggedIn"
      size="sm"
      round
      :icon="mdiLogout"
      class="q-ml-sm text-white"
      @click="useFirebaseAuth.logout"
    >
    </q-btn>
    <q-btn
      v-else
      size="sm"
      round
      :icon="mdiAccountPlus"
      class="q-ml-sm text-white"
      @click="useFirebaseAuth.signInWithGoogle"
    >
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { mdiAccountPlus, mdiLogout } from '@quasar/extras/mdi-v7';
import { useFirebaseAuth } from 'utils/useFirebaseAuth';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { loggedIn } = storeToRefs(auth);
</script>

<style scoped></style>
