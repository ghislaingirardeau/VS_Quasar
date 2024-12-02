<template>
  <q-layout view="hHh lpR fFf">
    <LayoutHeader />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'src/components/shopping/LayoutHeader.vue';
</script>

<style scoped></style>
