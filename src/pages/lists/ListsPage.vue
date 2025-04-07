<template>
  <q-page padding>
    <draggable v-model="lists" tag="div" item-key="id" v-bind="dragOptions">
      <template #item="{ element }">
        <q-list bordered separator>
          <q-item :key="element.id" v-ripple clickable>
            <q-item-section @click="goToListId(element.id, element.name)">
              <q-item-label class="font-bold italic text-base">{{
                element.name
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar class="flex flex-row flex-center">
              <q-icon color="primary" :name="mdiPencil" class="mr-4">
                <q-popup-edit
                  v-slot="scope"
                  v-model="element.name"
                  auto-save
                  class="w-2/3"
                >
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
              </q-icon>

              <q-icon
                color="primary"
                class="icon-delete mr-4"
                :name="mdiDelete"
                @click="handleListToDelete(element)"
              />
              <q-icon color="grey-8" :name="mdiReorderHorizontal" />
            </q-item-section> </q-item
        ></q-list>
      </template>
    </draggable>
    <ListDialog />

    <DeleteDialog
      v-if="listSelected"
      v-model:show-dialog-delete="isDialogDeleteVisible"
      v-model:is-deleting="isDeleting"
      :element-name="listSelected.name"
      element-type="la liste"
      @delete-element="deleteElement"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import ListDialog from 'src/components/list/ListDialog.vue';
import {
  mdiDelete,
  mdiPencil,
  mdiReorderHorizontal,
} from '@quasar/extras/mdi-v7';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { List } from 'src/types/lists';
import { useRouter } from 'vue-router';
import { dragOptions } from 'src/utils';
import { useGlobal } from 'src/stores/global';
import DeleteDialog from 'src/components/deleteDialog.vue';
import { updateDataFirestore } from 'src/utils/firestore';

const router = useRouter();
const listsStore = useLists();
const { lists } = storeToRefs(listsStore);
const isNameAlreadyExists = ref(false);
const globalStore = useGlobal();
const { isDialogDeleteVisible } = storeToRefs(globalStore);
const listSelected = ref<Ref<List> | null>(null);
const isDeleting = ref(false);

const rules = computed(() => [
  (val: string) => (val && val.length > 0) || 'Taper au moins un caractère',
  (val: string) => isNameUnique(val) || 'Name already exists',
]);

function isNameUnique(val: string) {
  const findListWithSameName = lists.value.find((list) => list.name === val);
  isNameAlreadyExists.value = findListWithSameName ? false : true;
  return isNameAlreadyExists.value;
}

async function inputValidation(scope: any) {
  isNameAlreadyExists.value ? scope.set() : scope.cancel();
  // mets à jour la db firestore
  await updateDataFirestore(lists.value, 'lists');
}

function handleListToDelete(list: List) {
  listSelected.value = list;
  globalStore.showDeleteDialog();
}

async function deleteElement() {
  try {
    isDeleting.value = true;
    if (!listSelected.value) return;
    await listsStore.deleteList(listSelected.value.id);
    globalStore.hideDeleteDialog();
    isDeleting.value = false;
  } catch (error) {
    console.log(error);
    isDeleting.value = false;
  }
}

function goToListId(id: number, name: string) {
  router.push({ name: 'list-id', params: { id }, state: { name } });
}
</script>

<style scoped></style>
