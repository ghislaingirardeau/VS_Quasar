<template>
  <svg ref="barcode" class="rounded-md"></svg>
</template>

<script setup lang="ts">
import JsBarcode from 'jsbarcode';
import { onMounted, ref, watch } from 'vue';
import { Barcode } from 'src/types/cards';

const barcode = ref<SVGSVGElement | null>(null);

const props = defineProps({
  barcodeValue: {
    type: Object as () => Barcode,
    required: true,
  },
  barcodeWidth: {
    type: Number,
    default: 2,
  },
});

const generateBarcode = () => {
  if (barcode.value) {
    JsBarcode(barcode.value, props.barcodeValue.code, {
      format: props.barcodeValue.format,
      width: props.barcodeWidth,
      height: 80,
      displayValue: true,
    });
  }
};

onMounted(generateBarcode);

watch(
  () => props.barcodeValue,
  (newValue) => {
    if (newValue.code.length) {
      generateBarcode();
    }
  },
);
</script>

<style scoped></style>
