<template>
  <q-page padding>
    <h2 class="text-h4 q-my-sm">Todo list</h2>
    <pre>{{ selectedRow }}{{ filter }}</pre>
    <q-table
      ref="tableComponent"
      v-model:fullscreen="fullscreen"
      v-model:selected="selectedRow"
      selection="multiple"
      title="Todos"
      :rows="todos"
      :columns
      :loading="isFetching"
      :rows-per-page-options="[5]"
      table-header-class="bg-blue text-blue-1"
      row-key="name"
      :filter="filter"
      @row-click="(_evt, row) => console.log(row)"
    >
      <template #top-right>
        <!-- Template: pour avoir un controle totale des cellules du tableau et personnaliser -->
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          :icon="!fullscreen ? 'fullscreen' : 'fullscreen_exit'"
          @click="fullscreen = !fullscreen"
        >
        </q-btn>
      </template>
      <template #header-cell-email="scope">
        <q-th :props="scope" class="md bg-blue-5">
          {{ scope.col.name }}
        </q-th>
      </template>

      <template #body-cell-username="scope">
        <!-- scope cells, appliquera la mise en forme des cellules par défaut et non celle spécifié  -->
        <!-- Pour garantir que les cellules garderont leur mise en forme, il faut passer la props scope dans q-td -->
        <q-td :props="scope">
          <q-chip class="glossy">{{ scope.value }} </q-chip>
        </q-td>
      </template>
      <template #body-cell-email="scope">
        <q-td :props="scope" class="md">
          {{ scope.value }}
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
        <!-- tableComponent est une ref js, donc je peux utiliser les méthodes de q-table dans le script  -->
        <q-btn
          icon="arrow_right"
          :disable="scope.isLastPage"
          @click="tableComponent.nextPage()"
        >
        </q-btn>
      </template>
    </q-table>
    <!-- <pre>{{ todos }}</pre> -->
  </q-page>
</template>

<script setup>
import { useFetch } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

const fullscreen = ref(false);
// pour avoir le ligne sélectionner d'un coups en reference
const selectedRow = ref([]);
// pour gérer le filtre du tableau
const filter = ref('');
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
    name: 'email',
    align: 'left',
    label: 'email',
    field: 'email',
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

function onRequest(props) {
  console.log(props);
}
</script>

<style lang="scss" scoped>
.header_cell_email--blue {
  background-color: blue;
}
</style>
