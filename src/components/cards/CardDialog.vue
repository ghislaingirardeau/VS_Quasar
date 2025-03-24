<template>
  <q-dialog v-model="isDialogCardVisible">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Ajouter une carte</div>
        <p>{{ bartest }}</p>
        <q-space />
        <q-btn
          icon="close"
          class="btn-close"
          flat
          round
          dense
          @click="closeDialog"
        />
      </q-card-section>

      <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <q-card-section class="pb-0">
          <q-select
            v-model="form.shop"
            :options="shops"
            label="Séléctionne une enseigne"
            :rules="[
              (val) =>
                (val && val.label.length > 0) ||
                'Une enseigne doit etre selectionné',
            ]"
          />
          <q-input
            v-model="form.barcode"
            filled
            label="Numéro client"
            class="form-list-name"
            :lazy-rules="false"
            :rules="[
              (val) =>
                (val && !isNaN(val) && val.length > 0) ||
                'Taper au moins un nombre et pas de lettres',
            ]"
            @blur="barcodePreview"
          />
          <div>
            <q-checkbox
              v-model="form.isShoppingCard"
              label="Carte pour les achats en magasin ?"
            />
          </div>
          <div>
            <q-checkbox
              v-model="form.isCardCode"
              label="Associer un code à la carte ?"
            />
          </div>
          <q-input
            v-if="form.isCardCode"
            v-model="form.password"
            :type="isPassword ? 'password' : 'text'"
            hint="Password with toggle"
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

        <q-card-section class="flex flex-center">
          <BarCodeRender
            v-if="showBarcodePreview && form.barcode.length"
            :barcode-value="form.barcode"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCards } from 'src/stores/card';
import { AddPromiseError } from 'src/types';
import { Card } from 'src/types/cards';
import { ref } from 'vue';
import BarCodeRender from 'src/components/cards/barcodeRender.vue';
import { colors } from 'utils/index';

const cardStore = useCards();
const { isDialogCardVisible, cards } = storeToRefs(cardStore);
const bartest = 'BarcodeDetector' in globalThis;

const responseError = ref('');
const isPassword = ref(true);
const showBarcodePreview = ref(false);

const form = ref<Card>({
  id: 0,
  shop: {
    id: null,
    label: '',
  },
  barcode: '',
  isShoppingCard: false,
  isCardCode: false,
  password: '',
  color: null,
});

const shops = [
  {
    id: 0,
    label: 'Marché U',
  },
  {
    id: 1,
    label: 'Leclerc',
  },
  {
    id: 2,
    label: 'Carrefour',
  },
  {
    id: 3,
    label: 'Intermarché',
  },
  {
    id: 4,
    label: 'Auchan',
  },
];

function barcodePreview() {
  showBarcodePreview.value = true;
}

async function onSubmit() {
  try {
    form.value.id = Date.now();
    form.value.color = setCardColor();
    const response = (await cardStore.addcard(form.value)) as {
      success: boolean;
    };
    if (response && response.success) {
      closeDialog();
    }
  } catch (error: unknown) {
    const typedError = error as AddPromiseError;
    responseError.value = typedError.cardAlreadyExist!;
  }
}

function closeDialog() {
  cardStore.hideDialogCard();
  onReset();
}

function onReset() {
  form.value = {
    id: 0,
    shop: {
      id: null,
      label: '',
    },
    barcode: '',
    isShoppingCard: false,
    isCardCode: false,
    password: '',
    color: null,
  };
}

function setCardColor(index?: number): string {
  let cardsLength = index || cards.value.length;
  if (cardsLength >= colors.length) {
    let total = cardsLength - colors.length;
    if (total >= colors.length) {
      setCardColor(total);
    } else {
      return colors[total];
    }
  }
  return colors[cardsLength];
}
</script>

<style lang="scss"></style>
