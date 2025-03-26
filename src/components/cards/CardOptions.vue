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
    <q-input
      v-if="form.isCardCode"
      v-model="form.password"
      :type="isPassword ? 'password' : 'text'"
      :lazy-rules="false"
      :rules="[(val) => (val && val.length > 0) || 'Ne peut pas etre vide']"
    >
      <template #append>
        <q-icon
          :name="isPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPassword = !isPassword"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { Card } from 'src/types/cards';
import { ref } from 'vue';

const form = defineModel('form', {
  type: Object as () => Card,
  required: true,
});

const isPassword = ref(true);
</script>

<style scoped></style>
