<template>
  <q-page padding>
    <q-list bordered separator>
      <q-item v-for="list in lists" :key="list.id" v-ripple clickable>
        <q-item-section>
          <q-item-label>{{ list.name }}</q-item-label>
          <q-popup-edit v-slot="scope" v-model="list.name" auto-save>
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
            @click="handleListToDelete(list)"
          />
        </q-item-section> </q-item
    ></q-list>
    <ListDialog />
    <ListDialogDelete
      v-model:show-dialog-list-delete="showDialogListDelete"
      :list-selected="listSelected"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import ListDialog from 'src/components/list/ListDialog.vue';
import { mdiDelete } from '@quasar/extras/mdi-v7';

import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { List } from 'src/types';
import ListDialogDelete from 'src/components/list/ListDialogDelete.vue';

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
</script>

<style scoped></style>
