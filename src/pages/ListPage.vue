<template>
  <q-page padding>
    <q-list bordered separator>
      <q-item v-for="list in lists" :key="list.id" v-ripple clickable>
        <q-item-section>
          <q-item-label>{{ list.name }}</q-item-label>
        </q-item-section>
      </q-item></q-list
    >
    <ListDialog />
  </q-page>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import ListDialog from 'src/components/list/ListDialog.vue';
import { storeToRefs } from 'pinia';

const listsStore = useLists();
const { lists } = storeToRefs(listsStore);
</script>

<style scoped></style>
