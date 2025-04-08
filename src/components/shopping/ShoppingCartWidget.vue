<template>
  <q-btn
    size="sm"
    round
    :icon="mdiAccountCreditCard"
    class="q-ml-md text-white"
    @click="handleGoToWallet"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiAccountCreditCard } from '@quasar/extras/mdi-v7';
import { useRouter } from 'vue-router';
import { updateShoppingDataFirestore } from '../../utils/firestore';

const router = useRouter();

async function handleGoToWallet() {
  router.push({ name: 'wallet', query: { showShoppingCard: 'true' } });
  await updateShoppingDataFirestore();
}
</script>

<style scoped></style>
