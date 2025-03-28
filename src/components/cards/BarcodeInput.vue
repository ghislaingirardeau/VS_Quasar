<template>
  <q-input
    ref="barcodeInput"
    v-model="form.barcode.code"
    filled
    label="Numéro client"
    class="form-list-name"
    type="number"
    :lazy-rules="false"
    :rules="[
      (val) =>
        (val && val.length > 0) || 'Taper au moins un nombre ou une lettre',
    ]"
    @blur="$emit('barcode-preview')"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import { onMounted, ref } from 'vue';

defineEmits(['barcode-preview']);

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});

const barcodeInput = ref<HTMLElement | null>(null);

onMounted(() => {
  barcodeInput.value!.focus();
});
</script>

<style scoped></style>
