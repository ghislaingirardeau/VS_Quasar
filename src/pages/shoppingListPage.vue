<template>
  <q-page>
    <q-scroll-area style="height: 520px">
      <draggable
        v-model="shoppingList"
        tag="div"
        item-key="title"
        style="height: 200px"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <q-list separator bordered padding>
            <q-slide-item
              @left="handleDelete(element.id)"
              @right="handleDelete(element.id)"
            >
              <template #right> <q-icon :name="mdiDelete" /></template>
              <template #left> <q-icon :name="mdiCheck" /> </template>

              <q-item :key="element.id" class="cursor-grab">
                <q-item-section avatar>
                  <q-avatar :color="element.color" text-color="white" round />
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    :class="{ 'line-through italic': element.is_purchased }"
                  >
                    {{ element.title }}
                  </q-item-label>
                  <q-popup-edit
                    v-slot="scope"
                    v-model="element.title"
                    auto-save
                  >
                    <q-input
                      v-model="scope.value"
                      dense
                      autofocus
                      counter
                      @keyup.enter="scope.set"
                    />
                  </q-popup-edit>
                </q-item-section>
                <q-item-section side @click="handlePurchased(element.id)">
                  <transition
                    appear
                    enter-active-class="animated rotateIn"
                    leave-active-class="animated rotateOut"
                    mode="out-in"
                  >
                    <q-icon
                      v-if="element.is_purchased"
                      :name="mdiCheck"
                      :color="'green'"
                    />
                    <q-icon v-else :name="mdiClose" :color="'red'" />
                  </transition>
                </q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
        </template>
      </draggable>
    </q-scroll-area>
    <!-- <q-input v-model="newItem.title" outlined label="Item">
      <template #prepend>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color
            v-model="newItem.color"
            v-close-popup
            no-header
            no-footer
            default-view="palette"
            class="my-picker"
          />
        </q-popup-proxy>
        <q-btn
          :icon="mdiBrush"
          size="sm"
          round
          :style="{ backgroundColor: newItem.color }"
        ></q-btn>
      </template>
      <template #append>
        <q-btn
          round
          dense
          flat
          :icon="mdiPlus"
          class="cursor-pointer"
          @click="addNewItem"
        />
      </template>
    </q-input> -->

    <q-select
      filled
      :model-value="newItem.title"
      use-input
      hide-selected
      fill-input
      label="Item"
      input-debounce="0"
      :options="itemOptions"
      @filter="filterFn"
      @input-value="setModel"
    >
      <template #prepend>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color
            v-model="newItem.color"
            v-close-popup
            no-header
            no-footer
            default-view="palette"
            class="my-picker"
          />
        </q-popup-proxy>
        <q-btn
          :icon="mdiBrush"
          size="sm"
          round
          :style="{ backgroundColor: newItem.color }"
        ></q-btn>
      </template>
      <template #append>
        <q-btn
          round
          dense
          flat
          :icon="mdiPlus"
          class="cursor-pointer"
          @click="addNewItem"
        />
      </template>
      <!-- <template #no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template> -->
    </q-select>
  </q-page>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import {
  mdiCheck,
  mdiClose,
  mdiColorHelper,
  mdiDelete,
  mdiPlus,
} from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { uid } from 'quasar';
import { mdiBrush } from '@quasar/extras/mdi-v6';

const newItem: Ref<Item> = ref({ title: '', color: 'blue' });

const shoppings: Ref<Item[]> = useLocalStorage('shoppings', []);

type Item = {
  id?: string;
  title: string;
  category?: string;
  color?: string;
  is_purchased?: boolean;
};

const shoppingList = ref([
  {
    id: 1,
    title: 'lait',
    category: 'Laitier',
    color: 'blue',
    is_purchased: false,
  },
  {
    id: 2,
    title: 'pate',
    category: 'Pate',
    color: 'yellow',
    is_purchased: true,
  },
  {
    id: 3,
    title: 'sauce',
    category: 'Pate',
    color: 'yellow',
    is_purchased: true,
  },
  {
    id: 4,
    title: 'beurre',
    category: 'Frais',
    color: 'blue-4',
    is_purchased: true,
  },
]);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});

const itemOptions = ref();

const filterItemOptions = computed({
  get() {
    return itemOptions.value;
  },
  set(newValue) {
    itemOptions.value = newValue;
  },
});

function handleDelete(id: number) {
  shoppingList.value.filter((el) => el.id !== id);
}

function handlePurchased(id: number) {
  const item = shoppingList.value.find((el) => el.id === id);
  if (item) item.is_purchased = !item.is_purchased;
}

function addNewItem() {
  shoppings.value.push({
    id: uid(),
    title: newItem.value.title,
    category: 'Vegetable',
    color: newItem.value.color,
    is_purchased: false,
  });
  newItem.value = { title: '', color: 'blue' };
}

function filterFn(val: string, update: any) {
  update(() => {
    const needle = val.toLowerCase();
    filterItemOptions.value = needle;
    if (needle.length) {
      const filterList = shoppings.value.filter((el) =>
        el.title.toLowerCase().includes(needle),
      );
      filterItemOptions.value = filterList.map((el) => el.title);
    } else {
      filterItemOptions.value = shoppings.value.map((el) => el.title);
    }
  });
}

function setModel(val: string) {
  const findItem = shoppings?.value.find((el) => el.title === val);
  if (findItem) {
    newItem.value = findItem;
  }
}
</script>

<style lang="scss" scoped></style>
