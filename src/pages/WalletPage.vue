<template>
  <q-page :key="'wallet' + cards.length" padding>
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
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);
const globalStore = useGlobal();
const { isDialogDeleteVisible } = storeToRefs(globalStore);
const router = useRouter();

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
