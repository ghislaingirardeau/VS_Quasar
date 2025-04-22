<template>
  <div>
    <span>{{ userName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';

const auth = useAuth();
const { user } = storeToRefs(auth);

const userName = computed(() => {
  return user.value ? user.value.displayName : '';
});
</script>

<style scoped></style>
