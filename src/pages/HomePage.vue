<template>
  <q-page padding>
    <div class="flex justify-between">
      <q-card
        v-for="menu in menus"
        :key="menu.id"
        class="w-40 h-48 m-2 text-center"
        @click="goToPage(menu.pathName)"
      >
        <q-card-section>
          <div class="text-h6">{{ menu.title }}</div>
        </q-card-section>
        <q-separator />

        <q-card-section> {{ menu.description }} </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const menus = ref([
  {
    id: 1,
    title: 'Courses',
    pathName: 'shopping',
    description:
      'Pour faire les courses et accéder rapidement à votre carte fid',
  },
  {
    id: 2,
    title: 'Liste',
    pathName: 'lists',
    description: 'Liste ou note à mémoriser',
  },
  {
    id: 3,
    title: 'Carte fidelité',
    pathName: 'wallet',
    description: 'Enregistrer vos cartes fidelités',
  },
]);

function goToPage(path: string) {
  router.push({ name: path });
}
</script>

<style scoped></style>
