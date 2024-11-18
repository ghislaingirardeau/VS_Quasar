<template>
  <q-page class="row items-center justify-evenly">
    <q-icon size="xl" :name="mdiHomeAccount" color="blue"> </q-icon>
    hello
  </q-page>
</template>

<script setup lang="ts">
// Pour charger une seule icone et non toute la librairie d'icones, le rendu sera simplement un SVG
import { mdiHomeAccount } from '@quasar/extras/mdi-v7';
</script>

<style scoped></style>
