<template>
  <q-dialog v-model="isDialogCardVisible">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Ajouter une carte</div>
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
        <q-card-section class="pb-0">
          <q-input
            v-model="form.shop"
            filled
            label="Nom de la liste"
            class="form-list-name"
            :lazy-rules="false"
            :rules="[
              (val) => (val && val.length > 0) || 'Taper au moins un caractère',
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
import { useCards } from 'src/stores/card';
import { ref } from 'vue';

const cardStore = useCards();
const { isDialogCardVisible } = storeToRefs(cardStore);

const formComponent = ref();
const form = ref({
  id: 0,
  shop: '',
});

async function onSubmit() {
  try {
  } catch (error: unknown) {}
}

function closeDialog() {
  cardStore.hideDialogCard();
  onReset();
}

function onReset() {
  form.value.shop = '';
}
</script>

<style lang="scss"></style>
