<template>
  <q-page padding>
    <q-list bordered separator>
      <q-item v-for="item in items" :key="item.id" v-ripple clickable>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>
      </q-item></q-list
    >
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { Item } from 'src/types';

const items: Ref<Item[]> = ref([]);
</script>

<style scoped></style>
