<template>
  <q-page class="relative-position">
    <q-scroll-area style="height: 85vh">
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
                <q-item-section avatar @click="handlePurchased(element.id)">
                  <q-chip
                    :style="{
                      backgroundColor: element.is_purchased
                        ? 'grey'
                        : element.category.color,
                    }"
                    text-color="white"
                    size="sm"
                    round
                  >
                    {{ element.category.shortcut }}
                  </q-chip>
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
                      v-model.trim="scope.value"
                      dense
                      autofocus
                      counter
                      @keyup.enter="scope.set"
                    />
                  </q-popup-edit>
                </q-item-section>
                <q-item-section side class="q-mr-md">
                  <q-item-label
                    :class="{ 'line-through italic': element.is_purchased }"
                  >
                    {{ element.quantity }}
                  </q-item-label>
                  <q-popup-edit
                    v-slot="scope"
                    v-model.number="element.quantity"
                    auto-save
                  >
                    <q-input
                      v-model.number="scope.value"
                      style="width: 40px"
                      dense
                      autofocus
                      type="number"
                      min="1"
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
                      color="positive"
                    />
                    <q-icon v-else :name="mdiClose" color="negative" />
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
    <ShoppingToolbar
      v-model:new-item="newItem"
      class="absolute absolute-bottom"
      @add-new-item="addNewItem"
    />
  </q-page>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { mdiCheck, mdiClose, mdiDelete, mdiMenu } from '@quasar/extras/mdi-v7';
import { useLocalStorage } from '@vueuse/core';
import { uid } from 'quasar';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import { ShoppingItem } from 'src/types/shopping';
import { categories } from 'src/assets/category.json';
import { useShoppingItem } from 'src/stores/shoppingItems';
import { storeToRefs } from 'pinia';
import { dragOptions } from 'src/utils';

const newItem: Ref<ShoppingItem> = ref({
  title: '',
  quantity: 1,
  category: categories[0],
});

const shoppingsData: Ref<ShoppingItem[]> = useLocalStorage('shoppingsData', []);

const itemList = useShoppingItem();

const { shoppingItems } = storeToRefs(itemList);
const { handleDelete, handlePurchased, addToShoppingList } = itemList;

function addNewItem() {
  const isItemInShoppingsData = shoppingsData.value.find(
    (el) => el.title.toLowerCase() === newItem.value.title.toLowerCase(),
  );
  const itemToAdd = {
    id: uid(),
    title: newItem.value.title,
    quantity: newItem.value.quantity,
    category: newItem.value.category,
    is_purchased: false,
  };
  if (!isItemInShoppingsData) {
    shoppingsData.value.push(itemToAdd);
  }
  addToShoppingList(itemToAdd);
  newItem.value = { title: '', quantity: 1, category: categories[0] };
}
</script>

<style lang="scss" scoped></style>
