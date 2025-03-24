<template>
  <q-dialog :model-value="showDialogDelete" @hide="closeDialog">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Supprimer {{ props.elementType }}: {{ props.elementName }}</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="danger" @click="closeDialog" />
        <q-btn
          flat
          label="Ok"
          color="primary"
          class="confirm-delete"
          @click="$emit('delete-element')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const showDialogDelete = defineModel('showDialogDelete', {
  type: Boolean,
});

defineEmits(['delete-element']);

const props = defineProps({
  elementName: { type: String, required: true },
  elementType: { type: String, required: true },
});

function closeDialog() {
  showDialogDelete.value = false;
}
</script>

<style scoped></style>
