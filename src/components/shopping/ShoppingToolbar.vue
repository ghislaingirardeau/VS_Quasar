<template>
  <q-toolbar class="q-my-md">
    <q-btn
      :icon="mdiBrush"
      size="sm"
      class="mr-4"
      round
      :style="{ backgroundColor: newItem.category?.color }"
    >
      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
        <q-card>
          <q-card-section>
            <h4 class="text-lg">Catégory</h4>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <q-btn
              v-for="category in categories"
              :key="category.id"
              v-close-popup
              no-caps
              class="q-ma-xs text-white"
              :style="{ backgroundColor: category.color }"
              :label="category.shortcut"
              @click="handlePickCategory(category)"
            />
          </q-card-section>
        </q-card>
      </q-popup-proxy>
    </q-btn>
    <q-select
      :model-value="newItem.title"
      use-input
      borderless
      hide-selected
      hide-dropdown-icon
      style="width: 200px"
      fill-input
      label="Item"
      input-debounce="0"
      :options="itemOptions"
      @filter="filterFn"
      @update:model-value="setModel"
      @input-value="setTitle"
    >
    </q-select>
    <q-input
      v-model.number="newItem.quantity"
      borderless
      style="width: 50px"
      label="Quantité"
      min="1"
      class="mx-2"
      type="number"
    ></q-input>
    <q-space />
    <q-btn
      :icon="mdiPlus"
      :disable="isBtnAddEnable"
      color="primary"
      round
      size="sm"
      class="cursor-pointer"
      @click="emit('addNewItem')"
    />
  </q-toolbar>
</template>

<script setup lang="ts">
import { mdiBrush } from '@quasar/extras/mdi-v6';
import { mdiPlus } from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { computed, Ref, ref } from 'vue';
import { Item, Category } from 'src/types/index';
import { categories } from 'src/assets/category.json';

const shoppingsData: Ref<Item[]> = useLocalStorage('shoppingsData', []);

const newItem = defineModel('newItem', { type: Object });
const emit = defineEmits(['addNewItem']);

const itemOptions = ref();

const isBtnAddEnable = computed(() => {
  return newItem.value.title.length > 0 ? false : true;
});

const filterItemOptions = computed({
  get() {
    return itemOptions.value;
  },
  set(newValue) {
    itemOptions.value = newValue;
  },
});

function filterFn(val: string, update: any) {
  update(() => {
    const needle = val.toLowerCase();
    filterItemOptions.value = needle;
    if (needle.length) {
      const filterList = shoppingsData.value.filter((el) =>
        el.title.toLowerCase().startsWith(needle),
      );
      filterItemOptions.value = filterList.map((el) => el.title);
    } else {
      filterItemOptions.value = [];
    }
  });
}

function setModel(val: string) {
  const findItem = shoppingsData?.value.find((el) => el.title === val);
  if (findItem) {
    newItem.value = { ...findItem };
  } else {
    newItem.value.title = val;
  }
}

function setTitle(val: string) {
  newItem.value.title = val;
}

function handlePickCategory(category: Category) {
  newItem.value.category = category;
}
</script>

<style scoped></style>
