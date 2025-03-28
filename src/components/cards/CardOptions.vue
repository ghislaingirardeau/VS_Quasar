<template>
  <div>
    <div>
      <q-checkbox
        v-model="form.isShoppingCard"
        label="Carte pour les achats en magasin ?"
      />
    </div>
    <div>
      <q-checkbox
        v-model="form.isCardCode"
        label="Associer un code à la carte ?"
      />
    </div>
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
