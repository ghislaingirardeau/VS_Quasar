<template>
  <q-carousel v-model="slide" swipeable animated infinite thumbnails>
    <q-carousel-slide img-src="https://picsum.photos/800/500" name="1">
      <div
        class="absolute-top flex flex-center q-pa-lg"
        style="background-color: rgba(0, 0, 0, 0.2)"
      >
        Look really nice
      </div>
    </q-carousel-slide>
    <q-carousel-slide img-src="https://picsum.photos/800/501" name="2">
      <div
        class="absolute-top flex flex-center q-pa-lg"
        style="background-color: rgba(0, 0, 0, 0.2); color: white"
      >
        Look really nice
      </div>
    </q-carousel-slide>
    <q-carousel-slide img-src="https://picsum.photos/800/502" name="3">
    </q-carousel-slide>
    <q-carousel-slide img-src="https://picsum.photos/800/503" name="4">
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slide = ref('1');
</script>

<style scoped></style>
