<template>
  <q-page>
    <div class="row">
      <div class="col-7">
        <q-select
          outlined
          :model-value="newItem.title"
          use-input
          hide-selected
          hide-dropdown-icon
          fill-input
          label="Item"
          input-debounce="0"
          :options="itemOptions"
          @filter="filterFn"
          @update:model-value="setModel"
          @input-value="setTitle"
        >
          <template #prepend>
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
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
        </q-select>
      </div>
      <div class="col-3 flex flex-center mx-2">
        <q-input
          v-model.number="newItem.quantity"
          label="Quantité"
          min="1"
          outlined
          type="number"
        ></q-input>
      </div>
      <div class="col flex flex-center mx-2">
        <q-btn
          :icon="mdiPlus"
          :disable="isBtnAddEnable"
          color="primary"
          round
          class="cursor-pointer"
          @click="addNewItem"
        />
      </div>
    </div>
    <q-scroll-area style="height: 520px">
      <draggable
        v-model="shoppingItems"
        tag="div"
        handle=".handle"
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
                  <q-avatar
                    :style="{
                      backgroundColor: element.is_purchased
                        ? 'grey'
                        : element.color,
                    }"
                    text-color="white"
                    round
                  />
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
                <q-item-section side>
                  <q-icon :name="mdiMenu" class="handle"></q-icon>
                </q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
        </template>
      </draggable>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import {
  mdiCheck,
  mdiClose,
  mdiDelete,
  mdiMenu,
  mdiPlus,
} from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { uid } from 'quasar';
import { mdiBrush } from '@quasar/extras/mdi-v6';

const newItem: Ref<Item> = ref({ title: '', color: 'blue', quantity: 1 });

const shoppingsData: Ref<Item[]> = useLocalStorage('shoppings', []);

type Item = {
  id?: string;
  title: string;
  quantity: number;
  category?: string;
  color?: string;
  is_purchased?: boolean;
};

const shoppingItems: Ref<Item[]> = ref([
  {
    id: '0ecd588c-3fa6-47f2-9e24-b0e53fd425d7',
    title: 'poire',
    quantity: 1,
    category: 'Vegetable',
    color: 'rgb(255,255,0)',
    is_purchased: false,
  },
  {
    id: '0ecd588c-3fa6-47f2-9e24-b0e53fd425e7',
    title: 'banane',
    quantity: 1,
    category: 'Vegetable',
    color: 'rgb(255,255,0)',
    is_purchased: false,
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

function handleDelete(id: string) {
  shoppingItems.value.filter((el) => el.id !== id);
}

function handlePurchased(id: string) {
  const item = shoppingItems.value.find((el) => el.id === id);
  if (item) item.is_purchased = !item.is_purchased;
}

function addNewItem() {
  const isItemInShoppingsData = shoppingsData.value.find(
    (el) => el.title.toLowerCase() === newItem.value.title.toLowerCase(),
  );
  const isItemInList = shoppingItems.value.find(
    (el) => el.title.toLowerCase() === newItem.value.title.toLowerCase(),
  );
  const itemToAdd = {
    id: uid(),
    title: newItem.value.title,
    quantity: newItem.value.quantity,
    category: 'Vegetable',
    color: newItem.value.color,
    is_purchased: false,
  };
  if (!isItemInShoppingsData) {
    shoppingsData.value.push(itemToAdd);
  }
  if (!isItemInList) {
    shoppingItems.value.push(itemToAdd);
  }

  newItem.value = { title: '', color: 'blue', quantity: 1 };
}

function filterFn(val: string, update: any) {
  update(() => {
    const needle = val.toLowerCase();
    filterItemOptions.value = needle;
    if (needle.length) {
      const filterList = shoppingsData.value.filter((el) =>
        el.title.toLowerCase().includes(needle),
      );
      filterItemOptions.value = filterList.map((el) => el.title);
    } else {
      filterItemOptions.value = shoppingsData.value.map((el) => el.title);
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
</script>

<style lang="scss" scoped></style>
