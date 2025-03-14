<template>
  <q-btn
    v-if="routeName !== 'home'"
    size="sm"
    round
    :icon="routeName === 'list-id' ? mdiListBoxOutline : mdiArrowLeftBold"
    class="q-ml-sm text-white"
    @click="router.go(-1)"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiArrowLeftBold, mdiListBoxOutline } from '@quasar/extras/mdi-v7';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

console.log(route);

const routeName = computed(() => {
  return route.name;
});
</script>

<style scoped></style>
