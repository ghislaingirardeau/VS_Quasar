<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      flat
      bordered
      title="Treats"
      :rows="rows"
      row-key="id"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    >
      <template #top-right>
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
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';

/* 
Pour un chargement des données depuis un serveur
si on veut rappeler les données du serveur au changement de page ou sur un filtre
on va utiliser onRequest pour récupérer les datas et faire la MAJ en conséquence du tableau
*/

export default {
  setup() {
    const tableRef = ref();
    const rows = ref([]);
    const filter = ref('');
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    async function fetchFromServer(
      startRow,
      count,
      filter,
      sortBy,
      descending,
    ) {
      const { isFetching, error, data } = await useFetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      return JSON.parse(data.value);
    }

    async function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(async () => {
        // update rowsCount with appropriate value

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"

        const returnedData = await fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending,
        );

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = returnedData.length;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 1500);
    }

    onMounted(() => {
      // get initial data from server (1st page)
      // method de q-table, accessible car le tableau est lié à la ref tableRef
      tableRef.value.requestServerInteraction();
    });

    return {
      tableRef,
      filter,
      loading,
      pagination,
      rows,

      onRequest,
    };
  },
};
</script>
