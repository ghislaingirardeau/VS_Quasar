<template>
  <q-select
    v-model="form.shop"
    :options="shops"
    label="Séléctionne une enseigne"
    :behavior="'menu'"
    :rules="[
      (val) =>
        (val && val.label.length > 0) || 'Une enseigne doit etre sélectionnée',
    ]"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import { shops } from 'src/assets/shops.js';

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});
</script>

<style scoped></style>
