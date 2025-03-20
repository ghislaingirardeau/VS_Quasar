<template>
  <q-dialog v-model="isNewListDialogVisible" :full-height="props.isNewItem">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn
          icon="close"
          class="btn-close"
          flat
          round
          dense
          @click="closeDialog"
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
          <QuillEditor
            v-model:content="form.description"
            theme="snow"
            content-type="html"
            placeholder="Description"
            class="quill-editor"
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
import { AddPromiseError } from 'src/types';
import { computed, ref } from 'vue';

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
      closeDialog();
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
      closeDialog();
    }
  } catch (error: unknown) {
    const typedError = error as AddPromiseError;
    isNameAlreadyExists.value = typedError.nameAlreadyUsed!;
    await formComponent.value.validate();
  }
}

function closeDialog() {
  listsStore.hideNewListDialog();
  onReset();
}

function onReset() {
  form.value.name = '';
  form.value.id = 0;
  form.value.title = '';
  form.value.description = '';
  form.value.updated_at = null;
}
</script>

<style lang="scss">
.quill-editor {
  .ql-editor {
    height: 45vh;
  }
}
</style>
