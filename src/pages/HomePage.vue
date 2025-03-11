<template>
  <q-page padding>
    <q-card
      v-for="menu in menus"
      :key="menu.id"
      class="mb-4"
      @click="goToPage(menu.pathName)"
    >
      <q-card-section>
        <div class="text-h6">{{ menu.title }}</div>
      </q-card-section>
      <q-card-section> {{ menu.description }} </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const menus = ref([
  {
    id: 1,
    title: 'Liste de courses',
    pathName: 'shopping',
    description: 'Votre liste pour faire les courses',
  },
  {
    id: 2,
    title: 'Liste simple',
    pathName: 'list',
    description: 'Votre liste à faire tout simplement',
  },
  {
    id: 3,
    title: 'Mot de passe',
    pathName: 'password',
    description: 'Enregistrer vos mots de passe simple',
  },
]);

function goToPage(path: string) {
  console.log(path);
  router.push({ name: path });
}
</script>

<style scoped></style>
