<template>
  <q-select
    ref="select"
    v-model="form.shop"
    :options="filterOptions"
    label="Séléctionne une enseigne"
    use-input
    input-debounce="0"
    :behavior="'menu'"
    lazy-rules
    :rules="[
      (val) =>
        (val && val.label.length > 0) || 'Une enseigne doit etre sélectionnée',
    ]"
    @new-value="createShops"
    @focus="resetModel"
    @popup-hide="blurInput"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import { shops } from 'src/assets/shops.js';
import { ref, useTemplateRef } from 'vue';

const saveWidgetRef = useTemplateRef<HTMLInputElement>('select');

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});

const filterOptions = ref(shops);

function createShops(
  val: string,
  done: (newShop: { label: string; id: number }, mode?: 'toggle') => void,
) {
  if (val.length > 0) {
    const shopFound = shops.find(
      (shop) => shop.label.toLowerCase() === val.toLowerCase(),
    );
    if (shopFound) return;

    const newShop = {
      label: val,
      id: shops.length + 1,
    };
    done(newShop, 'toggle');
  }
}

function blurInput() {
  saveWidgetRef.value.blur();
}

function resetModel() {
  console.log('reset');
  form.value.shop = {
    label: '',
    id: 0,
  };
}
</script>

<style scoped></style>
