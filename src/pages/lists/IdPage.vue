<template>
  <q-page padding>
    {{ currentList }}
  </q-page>
</template>

<script setup lang="ts">
import { useLists } from 'src/stores/lists';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const listsStore = useLists();

const currentList = computed(() => {
  return listsStore.lists.find((list) => list.id === Number(route.params.id));
});
</script>

<style scoped></style>
