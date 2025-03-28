<template>
  <q-input
    v-model="password"
    :type="isPassword ? 'password' : 'text'"
    :lazy-rules="false"
    :rules="[(val) => (val && val.length > 0) || 'Ne peut pas etre vide']"
  >
    <template #append>
      <q-icon
        :name="isPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPassword = !isPassword"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const password = defineModel('password', {
  type: String,
  required: true,
});

const isPassword = ref(true);
</script>

<style scoped></style>
