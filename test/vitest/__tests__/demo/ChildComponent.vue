<template>
  <button @click="emit('incrementFromChild', count++)">Increment</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const emit = defineEmits(['incrementFromChild']);
</script>

<style scoped></style>
