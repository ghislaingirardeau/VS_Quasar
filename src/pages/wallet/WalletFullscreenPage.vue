<template>
  <q-page padding>
    <q-card :class="setBorderCardColor(currentCard.color)">
      <q-card-section class="flex flex-center">
        <BarcodeRender :barcode-value="currentCard.barcode" />
      </q-card-section>

      <q-card-section v-if="currentCard.isCardCode" class="flex flex-center">
        <q-input
          v-model="currentCard.password"
          readonly
          :type="isPassword ? 'password' : 'text'"
          hint="Montrer/Masquer le mot de passe"
        >
          <template #append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BarcodeRender from 'src/components/cards/barcodeRender.vue';
import { useCards } from 'src/stores/card';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

declare global {
  interface Window {
    Brightness: {
      getBrightness: (callback: (value: number) => void) => void;
      setBrightness: (value: number) => void;
    };
  }
}

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

const route = useRoute();
let previousBrightness: number | null = null;
const isCordova = () => !!window.cordova;
const isPassword = ref(true);

const cardId = computed(() => {
  return route.params.id as string;
});

const currentCard = computed(() => {
  return cards.value.find((list) => list.id === Number(cardId.value))!;
});

function setBorderCardColor(color: string | null) {
  return `bg-${color ? color : 'red'}-200`;
}

onMounted(() => {
  if (isCordova()) {
    window.Brightness.getBrightness((value: number) => {
      previousBrightness = value; // Sauvegarde la luminosité actuelle
    });

    // Met la luminosité à 100%
    window.Brightness.setBrightness(1.0);
  }
});

onUnmounted(() => {
  if (isCordova() && previousBrightness !== null) {
    // Rétablir la luminosité initiale
    window.Brightness.setBrightness(previousBrightness);
  }
});
</script>

<style scoped></style>
