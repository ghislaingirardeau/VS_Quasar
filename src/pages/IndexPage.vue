<template>
  <q-page>
    <div>hello quasar</div>
    <BootFile />
  </q-page>
</template>

<script setup lang="ts">
/* Pour avoir toutes les informations utilisées par quasar
lang, dark mode, screen & device, plateforme...
*/
import BootFile from 'components/BootFile.vue';
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';

const $q = useQuasar();

onMounted(() => {
  console.log($q);
});
</script>

<style scoped lang="scss">
.col-border {
  border: 2px solid $accent;
}
</style>
