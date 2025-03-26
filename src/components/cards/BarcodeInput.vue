<template>
  <q-input
    v-model="form.barcode.code"
    filled
    label="Numéro client"
    class="form-list-name"
    type="number"
    :lazy-rules="false"
    :rules="[
      (val) =>
        (val && !isNaN(val) && val.length > 0) ||
        'Taper au moins un nombre et pas de lettres',
    ]"
    @blur="$emit('barcode-preview')"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';

defineEmits(['barcode-preview']);

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});
</script>

<style scoped></style>
