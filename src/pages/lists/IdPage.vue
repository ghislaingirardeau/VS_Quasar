<template>
  <q-page padding>
    <draggable
      v-model="itemsInList"
      tag="div"
      item-key="name"
      v-bind="dragOptions"
    >
      <template #item="{ element }">
        <q-list separator bordered padding>
          <q-slide-item @left="resetLeft" @right="({ reset }) => reset()">
            <template #right> <q-icon :name="mdiDelete" /></template>
            <template #left> <q-icon :name="mdiCheck" /> </template>
            <q-item :key="element.id" class="cursor-grab">
              <q-item-section>
                <q-item-label>
                  {{ element.title }}
                </q-item-label>
                <q-item-label caption>
                  {{ element.description }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </template>
    </draggable>
    <ListDialog :is-new-item="true" :new-item-in-list-id="listId" />
  </q-page>
</template>

<script setup lang="ts">
import { mdiCheck, mdiDelete } from '@quasar/extras/mdi-v7';
import ListDialog from 'src/components/list/ListDialog.vue';
import { useLists } from 'src/stores/lists';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';

const route = useRoute();

const listsStore = useLists();

const listId = computed(() => {
  return route.params.id as string;
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});

const itemsInList = computed({
  get() {
    return listsStore.lists.find((list) => list.id === Number(listId.value))!
      .items;
  },
  set(value) {
    listsStore.updateItemInList(Number(listId.value), value);
  },
});

function resetLeft({ reset }) {
  setTimeout(() => {
    reset();
  }, 1000);
}
</script>

<style scoped></style>
