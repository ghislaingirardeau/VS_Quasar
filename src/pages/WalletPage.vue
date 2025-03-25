<template>
  <q-page :key="'wallet' + cards.length" padding>
    <pre>{{ barcodeDetected }}</pre>
    <draggable v-model="cards" tag="div" item-key="id" v-bind="dragOptions">
      <template #item="{ element }">
        <q-card
          :key="element.id"
          class="mb-4"
          :class="setBorderCardColor(element.color)"
          @click="goToWallet(element.id, element.shop.label)"
        >
          <q-card-section class="mb-3 flex flex-row">
            <div class="text-h5 font-bold italic">{{ element.shop.label }}</div>
            <q-space />
            <q-icon
              color="primary"
              class="icon-delete mr-4"
              size="sm"
              :name="mdiDelete"
              @click.stop="handleCardToDelete(element)"
            />
            <q-icon color="grey-8" size="sm" :name="mdiReorderHorizontal" />
          </q-card-section>
          <q-separator />
          <q-card-section class="flex flex-center">
            <BarcodeRender :barcode-value="element.barcode" />
          </q-card-section>
        </q-card>
      </template>
    </draggable>
    <CardDialog />
    <DeleteDialog
      v-if="selectedCard"
      v-model:show-dialog-delete="isDialogDeleteVisible"
      :element-name="selectedCard!.shop.label"
      element-type="la carte"
      @delete-element="deleteElement"
    />
  </q-page>
</template>

<script setup lang="ts">
import CardDialog from 'src/components/cards/CardDialog.vue';
import { useCards } from 'src/stores/card';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';
import { dragOptions } from 'src/utils';
import { mdiDelete, mdiReorderHorizontal } from '@quasar/extras/mdi-v7';
import { Card } from 'src/types/cards';
import BarcodeRender from 'src/components/cards/barcodeRender.vue';
import { useGlobal } from 'src/stores/global';
import DeleteDialog from 'src/components/deleteDialog.vue';
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

interface BarcodeDetected {
  code: string;
  format: string;
}

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);
const globalStore = useGlobal();
const { isDialogDeleteVisible } = storeToRefs(globalStore);
const router = useRouter();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BarcodeDetector = window.BarcodeDetector || class {};

const barcodeDetected = ref<BarcodeDetected | null>(null);
const codeBarMessage = ref<string[]>([]);

onMounted(() => {
  const imageEl = document.createElement('img');
  imageEl.src = '/codeBarTest.jpg';
  // Attendre que l'image soit complètement chargée
  imageEl.onload = () => {
    detectBarcode(imageEl);
  };

  imageEl.onerror = () => {
    console.error("Impossible de charger l'image");
    codeBarMessage.value.push("Erreur de chargement de l'image");
  };
});

const detectBarcode = async (imageElement: HTMLImageElement) => {
  if (!('BarcodeDetector' in window) || !window.BarcodeDetector) {
    console.error('BarcodeDetector API non supportée.');
    return;
  }
  codeBarMessage.value.push('Détection en cours...');
  try {
    const barcodeDetector = new BarcodeDetector({
      formats: ['qr_code', 'code_128', 'ean_13'],
    });
    const barcodes = await barcodeDetector.detect(imageElement);
    if (barcodes.length > 0) {
      barcodeDetected.value = {
        code: barcodes[0].rawValue,
        format: barcodes[0].format,
      };
      codeBarMessage.value.push('Code-barres détecté ');

      console.log('Code-barres détecté :', barcodeDetected.value);
    } else {
      codeBarMessage.value.push('Aucun code-barres détecté');
    }
  } catch (error) {
    console.error('Erreur lors de la détection :', error);
    codeBarMessage.value.push(`Ereur lors de la détection: ${error}`);
  }
};

const selectedCard = ref<Ref<Card> | null>(null);

function handleCardToDelete(card: Card) {
  selectedCard.value = card;
  globalStore.showDeleteDialog();
}

function deleteElement() {
  if (selectedCard.value) {
    cardsStore.removeCard(selectedCard.value.id);
    globalStore.hideDeleteDialog();
  }
}

function goToWallet(id: string, label: string) {
  router.push({ name: 'wallet-id', params: { id }, state: { name: label } });
}

function setBorderCardColor(color: string) {
  return `bg-${color}-200`;
}
</script>
