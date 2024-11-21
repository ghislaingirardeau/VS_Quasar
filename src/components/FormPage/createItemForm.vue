<template>
  <!-- Form to add item -->
  <q-card class="q-mx-xl q-px-xl">
    <q-btn @click="giveMeError">error backend</q-btn>
    <q-card-section>
      <q-form
        ref="formComponent"
        class="q-gutter-y-md"
        @submit="handleSubmitForm"
      >
        <q-input
          v-model="form.title"
          label="title"
          outlined
          :error="!!error?.title"
          :error-message="error?.title"
        />
        <!-- internal error validation avec lazy-rules => alert show only when input blur -->
        <!-- rules: value inside input (if true no error) else display message -->
        <q-input
          v-model="form.quantity"
          label="quantité"
          outlined
          lazy-rules
          :rules="[
            (value) => value > 0 || 'Need at least one quantity',
            (value) => value < 10 || 'Too many quantity',
          ]"
        />

        <q-input v-model="form.color" filled class="my-input">
          <template #append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="form.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-checkbox v-model="form.is_purchased" label="Purchased" />
        <q-select
          v-model="form.status"
          :options="['important', 'normal', 'urgent']"
          label="Status"
        />
        <q-btn label="Creer" type="submit" color="primary" class="full-width">
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
// Validator est une librairie pour vérif des validations

import { mdiCheck, mdiPlus } from '@quasar/extras/mdi-v7';
import { Dialog, Loading, Notify } from 'quasar';
import { ref } from 'vue';

const form = defineModel('form', { type: Object });
const emit = defineEmits(['create']);

// SIMULATE EXTERNAL ERROR VALIDATION FROM BACKEND
/* l'erreur sera rendu grace au 2 attribut à ajouter dans l'input
:error="!!error?.title.length"
:error-message="error?.title"
*/
const error = ref({});
function giveMeError() {
  error.value = {
    title: 'This title already exist in the bdd',
  };
}

// Validation form on submit
const formComponent = ref();
async function handleSubmitForm() {
  // rules is async, to pass each rules control (spécialement si on fait un appel au server pour controler une rule)
  const isValid = await formComponent.value.validate();
  if (isValid) {
    // ouvir une dialog de confirmation
    Dialog.create({
      title: 'Are you sure?',
      message: 'Voulez vous ajouter cet item ?',
      // sur la config des boutons, on peut ajouter toutes les props dispo sur q-btn (ie. icon, flat...)
      ok: {
        label: 'Yes',
        icon: mdiCheck,
      },
      cancel: {
        label: 'No',
        flat: true,
      },
    })
      .onOk(() => {
        Loading.show();

        setTimeout(() => {
          emit('create');
          Loading.hide();
          Notify.create({
            message: 'Item successfully added',
            icon: mdiPlus,
            color: 'positive',
          });
        }, 3000);
      })
      .onCancel(() => {
        /* handle cancel */
        form.value = {};
      });
  }
}
</script>

<style lang="scss" scoped></style>
