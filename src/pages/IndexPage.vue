<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <GoFullscreenBtn />
    </div>
    <q-icon size="xl" :name="mdiHomeAccount" color="blue"> </q-icon>
    hello
    <div>
      <NotifyBtn />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// Pour charger une seule icone et non toute la librairie d'icones, le rendu sera simplement un SVG
import GoFullscreenBtn from 'components/GoFullscreenBtn.vue';

import { mdiHomeAccount } from '@quasar/extras/mdi-v7';
import NotifyBtn from 'components/NotifyBtn.vue';
</script>

<style scoped></style>
