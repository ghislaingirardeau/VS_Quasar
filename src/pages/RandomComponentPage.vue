<template>
  <q-page padding>
    <div class="q-pa-lg">
      <h2 class="text-xl">Carousel</h2>
      <CarouselImage />
    </div>
    <div class="q-pa-lg">
      <h2 class="text-xl">Date Time Input</h2>
      <DateTimeInput />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CarouselImage from 'src/components/CarouselImage.vue';
import DateTimeInput from 'src/components/DateTimeInput.vue';
</script>

<style scoped></style>
