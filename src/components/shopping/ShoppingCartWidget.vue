<template>
  <q-btn
    size="sm"
    round
    :icon="mdiAccountCreditCard"
    class="q-ml-md text-white"
    @click="
      $router.push({ name: 'wallet', query: { showShoppingCard: 'true' } })
    "
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiAccountCreditCard } from '@quasar/extras/mdi-v7';
</script>

<style scoped></style>
