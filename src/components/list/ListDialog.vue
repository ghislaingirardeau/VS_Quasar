<template>
  <q-dialog v-model="isNewListDialogVisible">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="listsStore.hideNewListDialog"
        />
      </q-card-section>

      <q-form
        ref="formComponent"
        class="q-gutter-md"
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section v-if="props.isNewItem" class="pb-0">
          <q-input
            v-model="form.title"
            filled
            label="Titre"
            :lazy-rules="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Taper au moins un caractère',
            ]"
          />
          <q-input
            v-model="form.description"
            label="Description"
            filled
            type="textarea"
            :lazy-rules="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Taper au moins un caractère',
            ]"
          />
        </q-card-section>
        <q-card-section v-else class="pb-0">
          <q-input
            v-model="form.name"
            filled
            label="Nom de la liste"
            class="form-list-name"
            :lazy-rules="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Taper au moins un caractère',
              (val) => val !== isNameAlreadyExists || 'Name already exists',
            ]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLists } from 'src/stores/lists';
import { computed, ref } from 'vue';

interface AddListError {
  nameAlreadyUsed: string;
  success: boolean;
}

const props = defineProps({
  isNewItem: {
    type: Boolean,
    default: false,
  },
  newItemInListId: {
    type: String,
    default: '',
  },
});

const listsStore = useLists();
const { isNewListDialogVisible } = storeToRefs(listsStore);

const formComponent = ref();
const isNameAlreadyExists = ref('');
const form = ref({
  id: 0,
  name: '',
  title: '',
  description: '',
  updated_at: null as null | Date,
});

const title = computed(() => {
  return props.isNewItem ? 'Nouvel item' : 'Nouvelle liste';
});

async function onSubmit() {
  if (props.isNewItem) {
    await addNewItem();
  } else {
    await addNewList();
  }
}

async function addNewItem() {
  try {
    const itemForm = {
      title: form.value.title,
      id: Date.now(),
      description: form.value.description,
      list_id: Number(props.newItemInListId),
      created_at: new Date(),
    };
    const response = await listsStore.addItemInList(itemForm);
    if (response && response.success) {
      listsStore.hideNewListDialog();
      onReset();
    }
  } catch (error) {
    console.log(error);
    await formComponent.value.validate();
  }
}

async function addNewList() {
  try {
    const listForm = {
      name: form.value.name,
      id: Date.now(),
      updated_at: null,
    };
    const response = await listsStore.addList(listForm);
    if (response && response.success) {
      listsStore.hideNewListDialog();
      onReset();
    }
  } catch (error: unknown) {
    const typedError = error as AddListError;
    isNameAlreadyExists.value = typedError.nameAlreadyUsed;
    await formComponent.value.validate();
  }
}

function onReset() {
  form.value.name = '';
  form.value.id = 0;
  form.value.title = '';
  form.value.description = '';
  form.value.updated_at = null;
}
</script>

<style scoped></style>
