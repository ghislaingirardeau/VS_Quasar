<template>
  <q-dialog v-model="isDialogCardVisible" @hide="onReset">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Ajouter une carte</div>
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
        <q-card-section>
          <q-stepper v-model="step" vertical color="primary" animated>
            <q-step
              :name="1"
              title="Choix de l'enseigne"
              icon="settings"
              :done="step > 1"
            >
              <ShopOptions v-model:form="form" />

              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  :disable="!form.shop.label.length"
                  label="Continue"
                  @click="step = 2"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Capture du code barre"
              icon="create_new_folder"
              :done="step > 2"
            >
              <BarcodeDetection />
              <q-stepper-navigation>
                <p
                  v-if="!form.barcode.code.length"
                  class="text-primary underline cursor-pointer ml-6"
                  @click="step = 3"
                >
                  Saisir manuellement le code ?
                </p>
                <q-btn
                  v-else
                  color="primary"
                  label="Continue"
                  @click="step = 4"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="step = 1"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Saisie manuelle du code barre"
              caption="Optionnel"
              :disable="!isBarcodeManual"
              icon="assignment"
              :done="step > 2"
            >
              <BarcodeInput
                v-model:form="form"
                @barcode-preview="barcodePreview"
              />

              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  label="Continue"
                  :disable="!form.barcode.code.length"
                  @click="step = 4"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="step = 2"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="4"
              title="Ajout Options"
              icon="add_comment"
              :done="step > 3"
            >
              <CardOptions v-model:form="form" />

              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  :disable="form.isCardCode && !form.password.length"
                  label="Aperçu"
                  @click="step = 5"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="step = 3"
                />
              </q-stepper-navigation>
            </q-step>
            <q-step :name="5" title="Aperçu" icon="add_comment">
              <BarCodeRender
                v-if="showBarcodePreview && form.barcode.code.length"
                :barcode-value="form.barcode"
              />

              <q-stepper-navigation>
                <q-btn color="primary" label="Enregistrer" type="submit" />
                <q-btn
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="step = 4"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-section>
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
import BarcodeDetection from './BarcodeDetection.vue';
import ShopOptions from './ShopOptions.vue';
import BarcodeInput from './BarcodeInput.vue';
import CardOptions from './CardOptions.vue';

const cardStore = useCards();
const { isDialogCardVisible, cards } = storeToRefs(cardStore);

const responseError = ref('');
const showBarcodePreview = ref(false);
const isBarcodeManual = ref(false);

const step = ref(1);

const form = ref<Card>({
  id: 0,
  shop: {
    id: null,
    label: '',
  },
  barcode: {
    code: '',
    format: '',
  },
  isShoppingCard: false,
  isCardCode: false,
  password: '',
  color: null,
});

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
  step.value = 1;
  form.value = {
    id: 0,
    shop: {
      id: null,
      label: '',
    },
    barcode: {
      code: '',
      format: '',
    },
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
