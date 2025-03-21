<template>
  <q-page :key="'wallet' + cards.length" padding>
    <draggable v-model="cards" tag="div" item-key="id" v-bind="dragOptions">
      <template #item="{ element, index }">
        <q-card
          :key="element.id"
          class="mb-4"
          :class="setBorderCardColor(index)"
        >
          <q-card-section class="mb-3 flex flex-row">
            <q-item-label class="text-h5 font-bold italic"
              >{{ element.shop.label }}
            </q-item-label>
            <q-space />
            <q-icon
              color="primary"
              class="icon-delete mr-2"
              size="sm"
              :name="mdiDelete"
              @click="handleCardToDelete(element)"
            />
            <q-icon
              color="grey-8"
              size="sm"
              :name="mdiReorderHorizontal"
              class="mr-2"
            />
          </q-card-section>
          <q-separator />
          <q-card-section>
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
      element-type="carte"
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
import { colors } from 'src/utils/index';
import { useGlobal } from 'src/stores/global';
import DeleteDialog from 'src/components/deleteDialog.vue';
import { Ref, ref } from 'vue';

const cardsStore = useCards();
const globalStore = useGlobal();
const { cards } = storeToRefs(cardsStore);
const { isDialogDeleteVisible } = storeToRefs(globalStore);

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

function setBorderCardColor(index: number) {
  if (index >= colors.length) {
    let total = index - colors.length;
    if (total >= colors.length) {
      setBorderCardColor(total);
    } else {
      return `bg-${colors[total]}-200`;
    }
  } else {
    return `bg-${colors[index]}-200`;
  }
}
</script>
