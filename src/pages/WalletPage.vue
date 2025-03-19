<template>
  <q-page class="flex flex-center">
    <CardDialog />
    <div>
      Barcode Support by browser {{ barCode }}
      <q-input v-model="barcodeValue" label="Code-barres" outlined />
      <svg ref="barcode"></svg>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import JsBarcode from 'jsbarcode';
import CardDialog from 'src/components/cards/CardDialog.vue';

const barCode = 'BarcodeDetector' in window;

const barcodeValue = ref('89390009190983');
const barcode = ref<SVGSVGElement | null>(null);

const generateBarcode = () => {
  if (barcode.value) {
    JsBarcode(barcode.value, barcodeValue.value, {
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true,
    });
  }
};

onMounted(generateBarcode);
</script>
