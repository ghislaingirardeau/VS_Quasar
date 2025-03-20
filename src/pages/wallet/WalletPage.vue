<template>
  <q-page padding>
    <draggable v-model="cards" tag="div" item-key="id" v-bind="dragOptions">
      <template #item="{ element }">
        <q-list bordered separator>
          <q-item :key="element.id" v-ripple clickable>
            <q-item-section avatar @click="goToCArd(element)">
              <q-icon
                color="grey-8"
                :name="mdiReorderHorizontal"
                class="mr-2"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="font-bold italic text-base">{{
                element.shop.label
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                color="primary"
                class="icon-delete"
                :name="mdiDelete"
                @click="handleCardToDelete(element)"
              />
            </q-item-section> </q-item
        ></q-list>
      </template>
    </draggable>
    <CardDialog />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardDialog from 'src/components/cards/CardDialog.vue';
import { useCards } from 'src/stores/card';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';
import { dragOptions } from 'src/utils';
import { mdiDelete, mdiReorderHorizontal } from '@quasar/extras/mdi-v7';
import { Card } from 'src/types/cards';
import { useRouter } from 'vue-router';

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);
const router = useRouter();

function handleCardToDelete(card: Card) {
  cardsStore.removeCard(card.id);
}

function goToCArd(card: Card) {
  router.push({
    name: 'wallet-id',
    params: { id: card.id },
    state: { name: `Carte: ${card.shop.label}` },
  });
}
</script>
