<template>
  <q-btn
    size="sm"
    round
    :icon="mdiMenu"
    class="q-ml-sm text-white"
    @click="router.go(-1)"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiMenu } from '@quasar/extras/mdi-v7';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped></style>
