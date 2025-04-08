<template>
  <q-layout view="hHh lpR fFf">
    <LayoutHeader />

    <q-page-container>
      <router-view />
      <SaveWidget />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import SaveWidget from 'src/components/layouts/SaveWidget.vue';
</script>

<style scoped></style>
