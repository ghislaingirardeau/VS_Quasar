<template>
  <q-page padding>
    <draggable
      v-model="itemsInList"
      tag="div"
      item-key="id"
      v-bind="dragOptions"
    >
      <template #item="{ element }">
        <q-list separator bordered padding>
          <q-slide-item
            @left="resetLeft"
            @right="({ reset }) => showDeleteItemDialog({ reset }, element)"
          >
            <template #right> <q-icon :name="mdiDelete" /></template>
            <template #left> <q-icon :name="mdiCheck" /> </template>
            <q-item :key="element.id" class="cursor-grab flex flex-col">
              <q-item-section class="mb-3 flex flex-row">
                <q-item-label class="font-bold italic text-base">
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
                <q-icon color="grey-8" size="xs" :name="mdiReorderHorizontal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ element.description }}
                </q-item-label>
                <q-popup-edit
                  v-slot="scope"
                  v-model="element.description"
                  auto-save
                >
                  <q-input
                    v-model.trim="scope.value"
                    type="textarea"
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
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </template>
    </draggable>
    <ListDialog :is-new-item="true" :new-item-in-list-id="listId" />
    <ListDialogDelete
      v-model:show-dialog-list-delete="showDialogListDelete"
      :element-name="selectedItem.title"
      :is-item-to-delete="true"
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
import ListDialogDelete from 'src/components/list/ListDialogDelete.vue';
import { useLists } from 'src/stores/lists';
import { Item } from 'src/types';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import { dragOptions } from 'src/utils';

const route = useRoute();

const listsStore = useLists();
const showDialogListDelete = ref(false);
const selectedItem = ref({ id: 0, title: '' });

const listId = computed(() => {
  return route.params.id as string;
});

const currentList = computed(() => {
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
  showDialogListDelete.value = true;
  reset();
}

function deleteElement() {
  // comme itemsInList est un computed, je peux lui attribuer une nouvelle valeur sans avoir à passer par une mutation
  itemsInList.value = itemsInList.value.filter(
    (item) => item.id !== selectedItem.value.id,
  );
  showDialogListDelete.value = false;
}
</script>

<style scoped></style>
