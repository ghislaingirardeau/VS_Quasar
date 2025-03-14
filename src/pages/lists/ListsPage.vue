<template>
  <q-page padding>
    <draggable v-model="lists" tag="div" item-key="id" v-bind="dragOptions">
      <template #item="{ element }">
        <q-list bordered separator>
          <q-item :key="element.id" v-ripple clickable>
            <q-item-section
              avatar
              class="flex flex-row flex-center"
              @click="goToListId(element.id, element.name)"
            >
              <q-icon
                color="grey-8"
                :name="mdiReorderHorizontal"
                class="mr-2"
              />

              <q-icon color="primary" :name="mdiFolder" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ element.name }}</q-item-label>
              <q-popup-edit v-slot="scope" v-model="element.name" auto-save>
                <q-input
                  v-model.trim="scope.value"
                  dense
                  autofocus
                  counter
                  :lazy-rules="false"
                  :rules="rules"
                  @keyup.enter="inputValidation(scope)"
                />
              </q-popup-edit>
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                color="primary"
                :name="mdiDelete"
                @click="handleListToDelete(element)"
              />
            </q-item-section> </q-item
        ></q-list>
      </template>
    </draggable>
    <ListDialog />
    <ListDialogDelete
      v-model:show-dialog-list-delete="showDialogListDelete"
      :element-name="listSelected.name"
      @delete-element="deleteElement"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import ListDialog from 'src/components/list/ListDialog.vue';
import {
  mdiDelete,
  mdiFolder,
  mdiReorderHorizontal,
} from '@quasar/extras/mdi-v7';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { List } from 'src/types';
import ListDialogDelete from 'src/components/list/ListDialogDelete.vue';
import { useRouter } from 'vue-router';
import { dragOptions } from 'src/utils';

const router = useRouter();
const listsStore = useLists();
const { lists } = storeToRefs(listsStore);
const isNameAlreadyExists = ref(false);
const showDialogListDelete = ref(false);
const listSelected = ref({ id: 0, name: '', updated_at: null } as List);

const rules = computed(() => [
  (val: string) => (val && val.length > 0) || 'Taper au moins un caractère',
  (val: string) => isNameUnique(val) || 'Name already exists',
]);

function isNameUnique(val: string) {
  const findListWithSameName = lists.value.find((list) => list.name === val);
  isNameAlreadyExists.value = findListWithSameName ? false : true;
  return isNameAlreadyExists.value;
}

function inputValidation(scope: any) {
  isNameAlreadyExists.value ? scope.set() : scope.cancel();
}

function handleListToDelete(list: List) {
  showDialogListDelete.value = true;
  listSelected.value = list;
}

async function deleteElement() {
  try {
    await listsStore.deleteList(listSelected.value.id);
    showDialogListDelete.value = false;
  } catch (error) {
    console.log(error);
  }
}

function goToListId(id: number, name: string) {
  router.push({ name: 'list-id', params: { id }, state: { name } });
}
</script>

<style scoped></style>
