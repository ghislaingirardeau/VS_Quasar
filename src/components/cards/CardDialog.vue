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

      <q-form @submit.prevent="onSubmit" @reset="onReset">
        <q-stepper v-model="step" vertical color="primary" animated>
          <q-step
            :name="1"
            title="Choix de l'enseigne"
            :icon="mdiStoreSearch"
            :done="step > 1"
          >
            <ShopOptions v-model:form="form" />

            <q-stepper-navigation>
              <q-btn
                color="primary"
                :disable="!form.shop.label.length"
                label="Continue"
                @click="goToStep(2)"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Capture du code barre"
            :icon="mdiBarcodeScan"
            :done="step > 2"
          >
            <q-checkbox
              v-if="!barcodeDetectionErrorMessage"
              v-model="isCameraAllowed"
              class="mb-4"
              label="Utiliser la caméra pour scanner le code barre"
            />
            <p class="mb-2 italic">{{ barcodeDetectionErrorMessage }}</p>
            <q-checkbox
              v-if="!isCameraAllowed"
              v-model="isBarcodeManual"
              :label="`${!barcodeDetectionErrorMessage ? 'Ou saisir' : 'Saisir'} manuellement le code`"
              @click="step = 3"
            />
            <BarcodeDetection
              v-if="isCameraAllowed"
              v-model:form="form"
              @detection-error="handleBarcodeDetectionError"
            />
            <q-stepper-navigation>
              <q-btn
                v-if="form.barcode.code.length"
                color="primary"
                label="Continue"
                @click="goToStep(4)"
              />
              <q-btn
                flat
                color="primary"
                label="Back"
                class="q-ml-sm"
                @click="goToStep(1)"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Saisie manuelle du code barre"
            caption="Optionnel"
            :disable="!isBarcodeManual"
            :icon="mdiBarcodeOff"
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
                @click="goToStep(4)"
              />
              <q-btn
                flat
                color="primary"
                label="Back"
                class="q-ml-sm"
                @click="goToStep(2)"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="4"
            title="Ajout Options"
            :icon="mdiListBoxOutline"
            :done="step > 3"
          >
            <CardOptions v-model:form="form" />

            <q-stepper-navigation>
              <q-btn
                color="primary"
                :disable="form.isCardCode && !form.password.length"
                label="Aperçu"
                @click="goToStep(5)"
              />
              <q-btn
                flat
                color="primary"
                label="Back"
                class="q-ml-sm"
                @click="goToStep(3)"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step :name="5" title="Aperçu" :icon="mdiBarcode">
            <div>
              <BarCodeRender
                v-if="showBarcodePreview && form.barcode.code.length"
                :barcode-value="form.barcode"
                :barcode-width="1.3"
              />
            </div>
            <p v-if="responseError" class="text-sm italic text-red-400">
              {{ responseError }}
            </p>

            <q-stepper-navigation>
              <q-btn
                color="primary"
                label="Enregistrer"
                type="submit"
                :loading="isSaving"
              />
              <q-btn
                flat
                color="primary"
                label="Back"
                class="q-ml-sm"
                @click="goToStep(4)"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCards } from 'src/stores/card';
import { AddPromiseError } from 'src/types';
import { Card } from 'src/types/cards';
import { ref, watch } from 'vue';
import BarCodeRender from 'src/components/cards/barcodeRender.vue';
import BarcodeDetection from './BarcodeDetection.vue';
import ShopOptions from './ShopOptions.vue';
import BarcodeInput from './BarcodeInput.vue';
import CardOptions from './CardOptions.vue';
import {
  mdiBarcode,
  mdiBarcodeOff,
  mdiBarcodeScan,
  mdiListBoxOutline,
  mdiStoreSearch,
} from '@quasar/extras/mdi-v7';
import { CryptoJS } from 'src/boot/libraries';

const cardStore = useCards();
const { isDialogCardVisible } = storeToRefs(cardStore);

const responseError = ref('');
const showBarcodePreview = ref(false);
const isBarcodeManual = ref(false);
const isCameraAllowed = ref(false);
const barcodeDetectionErrorMessage = ref('');
const isSaving = ref(false);

const step = ref(1);

const form = ref<Card>({
  id: 0,
  shop: {
    id: null,
    label: '',
  },
  barcode: {
    code: '123',
    format: 'CODE128',
  },
  isShoppingCard: false,
  isCardCode: false,
  password: '',
  color: 'rgb(232,149,149)',
});

function goToStep(index: number) {
  if (index === 4 && (step.value === 3 || step.value === 2)) {
    barcodePreview();
  }

  step.value = index;
}

function barcodePreview() {
  showBarcodePreview.value = true;
}

async function onSubmit() {
  try {
    isSaving.value = true;
    form.value.id = Date.now();
    if (form.value.password) {
      const ciphertext = CryptoJS.AES.encrypt(
        form.value.password,
        process.env.APP_CRYPT_KEY!,
      ).toString();
      form.value.password = ciphertext;
    }
    await cardStore.addcard(form.value);
    closeDialog();
    isSaving.value = false;
  } catch (error: unknown) {
    const typedError = error as AddPromiseError;
    responseError.value = typedError.message;
    isSaving.value = false;
  }
}

function closeDialog() {
  cardStore.hideDialogCard();
  onReset();
}

function onReset() {
  isBarcodeManual.value = false;
  isCameraAllowed.value = false;
  barcodeDetectionErrorMessage.value = '';
  step.value = 1;
  form.value = {
    id: 0,
    shop: {
      id: null,
      label: '',
    },
    barcode: {
      code: '',
      format: 'CODE128',
    },
    isShoppingCard: false,
    isCardCode: false,
    password: '',
    color: null,
  };
}

function handleBarcodeDetectionError(payload: { message: string }) {
  isCameraAllowed.value = false;
  barcodeDetectionErrorMessage.value = payload.message;
}

watch(step, (newValue) => {
  if (newValue === 2) {
    isBarcodeManual.value = false;
    isCameraAllowed.value = false;
  }
});
</script>

<style lang="scss">
.q-stepper--vertical .q-stepper__tab {
  padding: 12px 10px;
}
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 24px 32px 35px;
}
</style>
