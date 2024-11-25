<template>
  <div class="row justify-center items-start q-gutter-lg">
    <q-intersection
      v-for="i in 50"
      :key="i"
      transition="scale"
      style="height: 100px; width: 200px"
    >
      <img src="https://picsum.photos/200/100" />
    </q-intersection>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
