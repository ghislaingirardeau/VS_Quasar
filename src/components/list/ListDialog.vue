<template>
  <q-dialog v-model="isNewListDialogVisible">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Nouvelle liste</div>
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
        <q-card-section class="pb-0">
          <q-input
            v-model="form.name"
            filled
            label="Nom de la liste"
            :lazy-rules="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Taper au moins un caractère',
              (val) => val !== isNameAlreadyExists || 'Name alredy exists',
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
import { ref } from 'vue';

interface AddListError {
  nameAlreadyUsed: string;
  success: boolean;
}

const listsStore = useLists();
const { isNewListDialogVisible } = storeToRefs(listsStore);

const formComponent = ref();
const isNameAlreadyExists = ref('');
const form = ref({
  id: 0,
  name: '',
  updated_at: null as null | Date,
});

async function onSubmit() {
  try {
    form.value.id = Date.now();
    const response = await listsStore.addList(form.value);
    if (response && response.success) {
      listsStore.hideNewListDialog();
      onReset();
    }
  } catch (error: unknown) {
    console.log('a list already exists with this name', error);
    const typedError = error as AddListError;
    isNameAlreadyExists.value = typedError.nameAlreadyUsed;
    await formComponent.value.validate();
  }
}

function onReset() {
  form.value.name = '';
}
</script>

<style scoped></style>
