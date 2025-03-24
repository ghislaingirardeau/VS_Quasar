<template>
  <q-page padding>
    <q-card>
      <q-card-section class="flex flex-center">
        <div class="text-h5 font-bold italic">
          {{ currentCard.shop.label }}
        </div>
      </q-card-section>
      <q-card-section class="flex flex-center">
        <BarcodeRender :barcode-value="currentCard.barcode" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BarcodeRender from 'src/components/cards/barcodeRender.vue';
import { useCards } from 'src/stores/card';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

const route = useRoute();

const cardId = computed(() => {
  return route.params.id as string;
});

const currentCard = computed(() => {
  return cards.value.find((list) => list.id === Number(cardId.value))!;
});
</script>

<style scoped></style>
