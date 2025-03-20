<template>
  <svg ref="barcode"></svg>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode';
import { ref, watch } from 'vue';

const barcode = ref<SVGSVGElement | null>(null);

const props = defineProps({
  barcodeValue: {
    type: String,
    required: true,
  },
});

const generateBarcode = () => {
  if (barcode.value) {
    JsBarcode(barcode.value, props.barcodeValue, {
      format: 'CODE128',
      width: 2,
      height: 80,
      displayValue: true,
    });
  }
};

// onMounted(generateBarcode);

watch(
  () => props.barcodeValue,
  (newValue) => {
    if (newValue.length) {
      generateBarcode();
    }
  },
);
</script>

<style scoped></style>
