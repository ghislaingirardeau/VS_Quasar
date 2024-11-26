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
    <div class="q-pa-lg">
      <h2 class="text-xl">Transition</h2>

      <q-btn color="secondary" label="visilble" @click="showBtn = !showBtn" />
      <transition
        appear
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
        mode="out-in"
      >
        <q-btn v-if="showBtn" color="primary" icon="mail" label="Contact" />

        <q-btn v-else color="secondary" icon="mail" label="Email" />
      </transition>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CarouselImage from 'src/components/CarouselImage.vue';
import DateTimeInput from 'src/components/DateTimeInput.vue';
import { ref } from 'vue';

const showBtn = ref(false);
</script>

<style scoped></style>
