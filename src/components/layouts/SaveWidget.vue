<template>
  <q-btn
    v-if="user && !isShoppingPage"
    class="fixed fixed-bottom-right mr-5 mb-5"
    color="secondary"
    icon="save"
    round
    float
    :loading="isSaving"
    @click="saveToFirestore"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuth } from 'src/stores/auth';
import { updateGlobalDataFirestore } from 'utils/firestore';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const auth = useAuth();
const { user } = storeToRefs(auth);
const isSaving = ref(false);
const route = useRoute();

fetch('/non-existent-endpoint')
  .then((res) => res.text())
  .then(console.log)
  .catch(console.error);

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
