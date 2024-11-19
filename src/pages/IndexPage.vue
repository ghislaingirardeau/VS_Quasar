<template>
  <q-page class="row flex-center content-start">
    <div class="col-12 q-pa-md bg-blue-5">
      <GoFullscreenBtn />
    </div>
    <div class="col-8 q-pa-md bg-blue-5 flex flex-center">
      <q-icon size="xl" :name="mdiHomeAccount" color="blue"> </q-icon>
      <p>hello</p>
    </div>

    <div class="col-4 q-pa-md bg-blue-5">
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
