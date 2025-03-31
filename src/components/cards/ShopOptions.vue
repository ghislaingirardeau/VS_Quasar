<template>
  <q-select
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
    @filter="handleFilter"
  />
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import { shops } from 'src/assets/shops.js';
import { ref } from 'vue';

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});

const filterOptions = ref(shops);

function handleFilter(val: string, update: (callback: () => void) => void) {
  update(() => {
    if (val === '') {
      filterOptions.value = shops;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = shops.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1,
      );
    }
  });
}

function createShops(
  val: string,
  done: (newShop: { label: string; id: number }, mode?: 'toggle') => void,
) {
  if (val.length > 0) {
    const shopFound = shops.find(
      (shop) => shop.label.toLowerCase() === val.toLowerCase(),
    );
    const newShop = {
      label: val,
      id: shops.length + 1,
    };
    if (!shopFound) {
      shops.push(newShop);
    }
    done(newShop, 'toggle');
  }
}

function resetModel() {
  form.value.shop = {
    label: '',
    id: 0,
  };
}
</script>

<style scoped></style>
