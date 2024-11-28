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
                      style="width: 20px"
                      dense
                      autofocus
                      type="number"
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

const newItem: Ref<Item> = ref({
  title: '',
  quantity: 1,
  category: null,
});

const shoppingsData: Ref<Item[]> = useLocalStorage('shoppingsData', []);

const shoppingItems: Ref<Item[]> = useLocalStorage('currentShopping', []);

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
    category: newItem.value.category,
    is_purchased: false,
  };
  if (!isItemInShoppingsData) {
    shoppingsData.value.push(itemToAdd);
  }
  if (!isItemInList) {
    shoppingItems.value.push(itemToAdd);
  }

  newItem.value = { title: '', quantity: 1, category: null };
}
</script>

<style lang="scss" scoped></style>
