<template>
  <q-page padding>
    <h2 class="text-h4 q-my-sm">Todo list</h2>
    <q-table
      ref="tableComponent"
      v-model:fullscreen="fullscreen"
      title="Todos"
      :rows="todos"
      :columns
      :loading="isFetching"
      :rows-per-page-options="[2]"
      color="blue"
      row-key="name"
      @row-click="(_evt, row) => console.log(row)"
    >
      <template #top-right>
        <!-- Template: pour avoir un controle totale des cellules du tableau et personnaliser -->
        <q-btn
          :icon="!fullscreen ? 'fullscreen' : 'fullscreen_exit'"
          @click="fullscreen = !fullscreen"
        >
        </q-btn>
      </template>

      <template #body-cell-username="scope">
        <!-- scope cells, appliquera la mise en forme des cellules par défaut et non celle spécifié  -->
        <!-- Pour garantir que les cellules garderont leur mise en forme, il faut passer la props scope dans q-td -->
        <q-td :props="scope">
          <q-chip class="glossy">{{ scope.value }} </q-chip>
        </q-td>
      </template>
      <template #body-cell-address="scope">
        <q-td :props="scope">
          {{ scope.value.street }}
        </q-td>
      </template>
      <template #pagination="scope">
        <!-- scope: renvoie toutes les informations "pré-établi" par quasar, et que l'on peut réutilisé -->
        <!-- <pre>{{ scope }} </pre> -->
        <q-btn
          icon="arrow_left"
          :disable="scope.isFirstPage"
          @click="scope.prevPage()"
        >
        </q-btn>
        <q-btn
          icon="arrow_right"
          :disable="scope.isLastPage"
          @click="scope.nextPage()"
        >
        </q-btn>
      </template>
    </q-table>
    <pre>{{ todos }}</pre>
  </q-page>
</template>

<script setup>
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue';

const fullscreen = ref(false);
// Pour utiliser les méthodes du tableau directement dans le js
const tableComponent = ref();

const { isFetching, error, data } = useFetch(
  'https://jsonplaceholder.typicode.com/users',
);

const todos = computed(() => {
  return data.value ? JSON.parse(data.value) : [];
});

const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'username',
    align: 'center',
    label: 'username',
    field: 'username',
    sortable: false,
  },
  {
    name: 'address',
    align: 'center',
    label: 'address',
    field: 'address',
    sortable: false,
  },
]);
</script>

<style lang="scss" scoped></style>
