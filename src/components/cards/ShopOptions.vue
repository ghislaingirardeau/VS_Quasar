<template>
  <q-select
    v-model="form.shop"
    :options="shops"
    label="Séléctionne une enseigne"
    :rules="[
      (val) =>
        (val && val.label.length > 0) || 'Une enseigne doit etre sélectionnée',
    ]"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});

const shops = [
  {
    id: 0,
    label: 'Marché U',
  },
  {
    id: 1,
    label: 'Leclerc',
  },
  {
    id: 2,
    label: 'Carrefour',
  },
  {
    id: 3,
    label: 'Intermarché',
  },
  {
    id: 4,
    label: 'Auchan',
  },
];
</script>

<style scoped></style>
