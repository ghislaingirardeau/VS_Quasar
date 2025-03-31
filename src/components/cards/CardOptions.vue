<template>
  <div>
    <q-item v-ripple tag="label">
      <q-item-section avatar>
        <q-checkbox v-model="form.isShoppingCard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Carte pour les achats en magasin ?</q-item-label>
        <q-item-label caption
          >Pour l'utiliser en lien avec shopping liste !</q-item-label
        >
      </q-item-section>
    </q-item>
    <q-item v-ripple tag="label">
      <q-item-section avatar>
        <q-checkbox v-model="form.isCardCode" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Associer un code à la carte ?</q-item-label>
        <q-item-label caption
          >Si vous avez besoin d'un code pour utiliser la carte</q-item-label
        >
      </q-item-section>
    </q-item>

    <PasswordInput v-if="form.isCardCode" v-model:password="form.password" />
  </div>
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import PasswordInput from './passwordInput.vue';

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});
</script>

<style scoped></style>
