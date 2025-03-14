<template>
  <q-dialog :model-value="showDialogListDelete">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Supprimer la liste: {{ listSelected.name }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="danger" @click="closeDialog" />
        <q-btn flat label="Ok" color="primary" @click="deleteList" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import { List } from 'src/types';
import { PropType } from 'vue';

const listsStore = useLists();

const showDialogListDelete = defineModel('showDialogListDelete', {
  type: Boolean,
});

const props = defineProps({
  listSelected: {
    type: Object as PropType<List>,
    default: () => ({ id: 0, name: '' }),
  },
});

async function deleteList() {
  try {
    await listsStore.deleteList(props.listSelected.id);
    showDialogListDelete.value = false;
  } catch (error) {
    console.log(error);
  }
}

function closeDialog() {
  showDialogListDelete.value = false;
}
</script>

<style scoped></style>
