<template>
  <q-page>
    <!-- With unocss -->
    <!-- <div class="ma-xl op40 animate-bounce">hello quasar</div> -->
    <!-- With Tailwind -->
    <div class="text-3xl font-bold underline pl-5">
      {{ moment().format('dddd') }} {{ randomNumber() }}
    </div>

    <!-- Intro au fichier boots et aux appels API-->
    <BootFile />
    <!-- Pour les gros bloc de contenu ou image, le rendu et appel api se feront au fur et à mesure du scroll du user -->
    <IntersectionImage />
  </q-page>
</template>

<script setup lang="ts">
/* Pour avoir toutes les informations utilisées par quasar
lang, dark mode, screen & device, plateforme...
*/
import IntersectionImage from 'components/IntersectionImage.vue';
import BootFile from 'components/BootFile.vue';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { moment } from 'src/boot/moment';
import { randomNumber } from 'utils/index';

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
