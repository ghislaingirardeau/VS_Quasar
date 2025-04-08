<template>
  <q-btn
    v-if="user && !isShoppingPage"
    class="fixed fixed-bottom-right mr-5 mb-5"
    color="secondary"
    :icon="mdiSync"
    round
    float
    :loading="isSaving || isFetchingData"
    @click="saveToFirestore"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiSync } from '@quasar/extras/mdi-v7';
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';
import { updateGlobalDataFirestore } from 'utils/firestore';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const auth = useAuth();
const { user, isFetchingData } = storeToRefs(auth);
const isSaving = ref(false);
const route = useRoute();

const isShoppingPage = computed(() => {
  return route.name === 'shopping';
});

async function saveToFirestore() {
  isSaving.value = true;
  await updateGlobalDataFirestore();
  isSaving.value = false;
}
</script>

<style scoped></style>
