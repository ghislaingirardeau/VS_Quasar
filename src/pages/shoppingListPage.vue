<template>
  <q-page>
    <ShoppingToolbar v-model:new-item="newItem" @add-new-item="addNewItem" />
    <q-scroll-area style="height: 70vh">
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
              left-color="negative"
              @left="handleDelete(element.id)"
            >
              <template #left>
                <q-icon :name="mdiDelete" />
              </template>
              <template #right> <q-icon :name="mdiDelete" /> </template>

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
import { mdiCheck, mdiClose, mdiDelete, mdiMenu } from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { uid } from 'quasar';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import { Item } from 'src/types/index';

const newItem: Ref<Item> = ref({ title: '', color: 'blue', quantity: 1 });

const shoppingsData: Ref<Item[]> = useLocalStorage('shoppings', []);

const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', [
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

function handleDelete(id: string) {
  shoppingItems.value = shoppingItems.value.filter((el) => el.id !== id);
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
</script>

<style lang="scss" scoped></style>
