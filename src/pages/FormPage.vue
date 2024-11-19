<template>
  <q-page padding>
    <q-btn
      label="add item"
      class="q-my-md q-ml-xl"
      @click="isFormVisible = !isFormVisible"
    ></q-btn>
    <q-table
      class="q-mx-xl q-mb-xl"
      title="List"
      :rows="Object.values(list)"
      :columns="columns"
      row-key="title"
    >
      <template #body="props">
        <q-tr
          :props="props"
          :class="{ 'text-red': props.row.status === 'important' }"
        >
          <q-td key="title" :props="props">
            {{ props.row.title }}
            <q-popup-edit v-slot="scope" v-model="props.row.title">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
          </q-td>
          <q-td key="is_purchased" :props="props">
            <q-icon :name="props.row.is_purchased ? 'check' : 'cross'">
            </q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <CreateItemForm
      v-model:form="form"
      :hidden="isFormVisible"
      @create="handleAddItem"
    />
  </q-page>
</template>

<script setup>
import CreateItemForm from 'components/FormPage/createItemForm.vue';
import { useLocalStorage } from '@vueuse/core';
import { uid } from 'quasar';
import { ref } from 'vue';

/* 
Pour stocker des données, on peut ne pas utiliser de array mais directement un objet (ce qui peut etre plus facile à manipuler)
Chaque clé de l'objet sera l'id (unique) de la data, et celle-ci aura comme valeur la data (dans laquelle on aura une prop id donc 2 fois)
On se retrouvera avec un objet ayant pour chaque clé, un id propre à une data
*/
const list = useLocalStorage('list', {});

const form = ref({});
const isFormVisible = ref(true);

function handleAddItem() {
  // uid est une fonction inhérente à quasar
  const id = uid();
  // insert l'id dans la data
  form.value.id = id;
  // mets à jours le localstorage
  list.value[id] = form.value;

  form.value = {};
}

const columns = ref([
  {
    name: 'title',
    label: 'title',
    field: 'title',
    align: 'center',
    sortable: true,
  },
  {
    name: 'quantity',
    align: 'center',
    label: 'quantity',
    field: 'quantity',
  },
  {
    name: 'is_purchased',
    label: 'Purchased',
    field: 'is_purchased',
    align: 'center',
  },
]);
</script>

<style lang="scss" scoped></style>
