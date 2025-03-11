<template>
  <div>
    <div class="box bg-green-5 green"></div>
    <div class="box bg-red-5 red"></div>
    <div class="box bg-blue-5 blue"></div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'src/boot/libraries';
import { onMounted } from 'vue';

onMounted(() => {
  const tl = gsap.timeline();
  tl.to('.red', { duration: 1, x: 200 }).to('.green', {
    duration: 2,
    x: 200,
    ease: 'bounce',
  });
  gsap.to('.blue', { duration: 2, x: 200, rotation: 360, delay: 3 });
});
</script>

<style scoped>
.box {
  width: 50px;
  height: 50px;
}
</style>
