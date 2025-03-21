<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <q-page padding>
    <draggable
      v-model="itemsInList"
      tag="div"
      item-key="id"
      v-bind="dragOptions"
    >
      <template #item="{ element }">
        <q-list separator bordered class="mb-2 bg-slate-400">
          <q-slide-item
            @left="resetLeft"
            @right="({ reset }) => showDeleteItemDialog({ reset }, element)"
          >
            <template #right> <q-icon :name="mdiDelete" /></template>
            <template #left> <q-icon :name="mdiCheck" /> </template>
            <q-item :key="element.id" class="cursor-grab flex flex-col">
              <q-item-section class="mb-3 flex flex-row">
                <q-item-label class="text-h5 font-bold italic">
                  {{ element.title }}
                </q-item-label>
                <q-popup-edit v-slot="scope" v-model="element.title" auto-save>
                  <q-input
                    v-model.trim="scope.value"
                    dense
                    autofocus
                    counter
                    :lazy-rules="false"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Taper au moins un caractère',
                    ]"
                    @keyup.enter="scope.set()"
                  />
                </q-popup-edit>
                <q-space />
                <q-icon color="grey-8" size="sm" :name="mdiReorderHorizontal" />
              </q-item-section>
              <q-separator />

              <q-item-section class="py-2">
                <q-item-label
                  class="description"
                  v-html="sanitizeHtml(element.description)"
                >
                </q-item-label>
                <q-popup-edit
                  v-slot="scope"
                  v-model="element.description"
                  auto-save
                >
                  <QuillEditor
                    v-model:content="scope.value"
                    theme="snow"
                    content-type="html"
                    placeholder="Description"
                    class="quill-editor"
                  />
                  <div class="flex justify-end">
                    <q-btn
                      label="Ok"
                      class="mt-2"
                      color="primary"
                      @click="scope.set()"
                    />
                  </div>
                </q-popup-edit>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </template>
    </draggable>
    <ListDialog :is-new-item="true" :new-item-in-list-id="listId" />
    <DeleteDialog
      v-if="selectedItem"
      v-model:show-dialog-delete="isDialogDeleteVisible"
      :element-name="selectedItem.title"
      element-type="l'item"
      @delete-element="deleteElement"
    />
  </q-page>
</template>

<script setup lang="ts">
import {
  mdiCheck,
  mdiDelete,
  mdiReorderHorizontal,
} from '@quasar/extras/mdi-v7';
import ListDialog from 'src/components/list/ListDialog.vue';
import { useLists } from 'src/stores/lists';
import { Item } from 'src/types';
import { computed, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import { dragOptions } from 'src/utils';
import sanitizeHtml from 'sanitize-html';
import DeleteDialog from 'src/components/deleteDialog.vue';
import { useGlobal } from 'src/stores/global';
import { storeToRefs } from 'pinia';

const route = useRoute();

const listsStore = useLists();
const globalStore = useGlobal();
const { isDialogDeleteVisible } = storeToRefs(globalStore);
const selectedItem = ref<Ref<Item> | null>(null);

const listId = computed(() => {
  return route.params.id as string;
});

const currentList = computed(() => {
  listsStore.reorderList(Number(listId.value));
  return listsStore.lists.find((list) => list.id === Number(listId.value))!;
});

const itemsInList = computed({
  get() {
    return currentList.value.items;
  },
  set(value) {
    // utilise une fonction du store pour mettre à jour les items dans la liste
    listsStore.updateItemInList(Number(listId.value), value);
  },
});

function resetLeft({ reset }: { reset: () => void }) {
  setTimeout(() => {
    reset();
  }, 1000);
}

function showDeleteItemDialog({ reset }: { reset: () => void }, item: Item) {
  selectedItem.value = item;
  globalStore.showDeleteDialog();
  reset();
}

function deleteElement() {
  // comme itemsInList est un computed, je peux lui attribuer une nouvelle valeur sans avoir à passer par une mutation
  if (selectedItem.value) {
    itemsInList.value = itemsInList.value.filter(
      (item) => item.id !== selectedItem.value!.id,
    );
    globalStore.hideDeleteDialog();
  }
}
</script>

<style lang="scss">
.description {
  ul {
    margin-block: 5px;
  }

  li {
    list-style-type: square;
    list-style-position: inside;
    padding: 2px 0px 2px 10px;
  }
}
</style>
