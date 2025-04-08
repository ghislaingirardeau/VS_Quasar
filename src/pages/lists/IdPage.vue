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
        <q-card :key="element.id" class="cursor-grab flex flex-col">
          <q-card-section class="flex flex-row">
            <div class="text-h5 font-bold italic">
              {{ element.title }}
            </div>

            <q-space />

            <q-icon color="primary" :name="mdiPencil" size="sm" class="mr-4">
              <q-popup-edit
                v-slot="scope"
                v-model="element.title"
                auto-save
                class="w-2/3"
              >
                <q-input
                  v-model.trim="scope.value"
                  dense
                  autofocus
                  counter
                  :lazy-rules="false"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Taper au moins un caractère',
                  ]"
                  @keyup.enter="scope.set()"
                />
              </q-popup-edit>
            </q-icon>
            <q-icon
              color="primary"
              class="icon-delete mr-4"
              size="sm"
              :name="mdiDelete"
              @click="showDeleteItemDialog(element)"
            />
            <q-icon color="grey-8" size="sm" :name="mdiReorderHorizontal" />
          </q-card-section>
          <q-separator />

          <q-card-section class="py-2">
            <div
              class="description"
              v-html="sanitizeHtml(element.description)"
            ></div>
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
          </q-card-section>
        </q-card>
      </template>
    </draggable>
    <ListDialog :is-new-item="true" :new-item-in-list-id="listId" />
    <DeleteDialog
      v-if="selectedItem"
      v-model:show-dialog-delete="isDialogDeleteVisible"
      v-model:is-deleting="isDeleting"
      :element-name="selectedItem.title"
      element-type="l'item"
      @delete-element="deleteElement"
    />
  </q-page>
</template>

<script setup lang="ts">
import {
  mdiDelete,
  mdiPencil,
  mdiReorderHorizontal,
} from '@quasar/extras/mdi-v7';
import ListDialog from 'src/components/list/ListDialog.vue';
import { useLists } from 'src/stores/lists';
import { Item } from 'src/types/lists';
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
const isDeleting = ref(false);

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

function showDeleteItemDialog(item: Item) {
  selectedItem.value = item;
  globalStore.showDeleteDialog();
}

async function deleteElement() {
  isDeleting.value = true;
  // comme itemsInList est un computed avec un set, je peux lui attribuer une nouvelle valeur sans avoir à passer par une mutation
  if (selectedItem.value) {
    itemsInList.value = itemsInList.value.filter(
      (item) => item.id !== selectedItem.value!.id,
    );
  }
  globalStore.hideDeleteDialog();
  isDeleting.value = false;
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
