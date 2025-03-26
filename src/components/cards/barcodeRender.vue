<template>
  <svg ref="barcode"></svg>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode';
import { onMounted, ref } from 'vue';
import { Barcode } from 'src/types/cards';

const barcode = ref<SVGSVGElement | null>(null);

const props = defineProps({
  barcodeValue: {
    type: Object as () => Barcode,
    required: true,
  },
});

const generateBarcode = () => {
  if (barcode.value) {
    JsBarcode(barcode.value, props.barcodeValue.code, {
      format: props.barcodeValue.format,
      width: 2,
      height: 80,
      displayValue: true,
    });
  }
};

onMounted(generateBarcode);
</script>

<style scoped></style>
