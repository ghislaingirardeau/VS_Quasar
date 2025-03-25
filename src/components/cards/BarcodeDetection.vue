<template>
  <div class="flex flex-center">
    <video ref="videoElement" class="w-2/3"></video>
    <q-img
      v-if="imagePreview"
      :src="imagePreview"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    />
    <div>
      <p>Resultat</p>
      <div>
        {{ codeBarMessage }}
        {{ barcodeDetected }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

interface BarcodeDetected {
  code: string;
  format: string;
}

/* 
- Ouvir si user veut scanner un code
- Ouvre ce composant avec acces à la camera
- Option a tester userMediaDevices: 
    - si code bar detect during video
    - sinon code bar detect during image => doit alors prendre une photo
- Une fois la détection fait, rempli le form pour ajouter le type de format et le numero client => par un emit ? ou v-model ?
- Une fois le emit fait, ferme le composant
*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BarcodeDetector = window.BarcodeDetector || class {};

const barcodeDetected = ref<BarcodeDetected | null>(null);
const codeBarMessage = ref<string[]>([]);

const videoElement = ref<HTMLVideoElement | null>(null);
const imagePreview = ref<string | null>(null);

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    if (videoElement.value) {
      videoElement.value.srcObject = stream;
      videoElement.value.onloadedmetadata = () => {
        videoElement.value?.play();
        // getBarcodeFromVideoInterval.resume();
      };
      console.dir(videoElement.value);
    }
  } catch (error) {
    console.log(error);
  }
}

function stopCamera() {
  (videoElement.value?.srcObject as MediaStream)
    ?.getTracks()
    .forEach((track) => {
      track.stop();
    });
}

// Toutes les 5s, on extrait une image de la vidéo
const getBarcodeFromVideoInterval = useIntervalFn(() => {
  extractPictureFromVideo();
}, 5000);

// Fonction pour extraire une image de la vidéo
// Une fois l'image construite, la passer à la détection de code-barres
function extractPictureFromVideo() {
  if (videoElement.value) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.value.videoWidth;
    canvas.height = videoElement.value.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      imagePreview.value = imageData;
      const imageEl = document.createElement('img');
      imageEl.src = imageData;
      // Attendre que l'image soit complètement chargée
      imageEl.onload = () => {
        detectBarcode(imageEl);
      };
      imageEl.onerror = () => {
        console.error("Impossible de charger l'image");
        codeBarMessage.value.push("Erreur de chargement de l'image");
      };
    }
  }
}

// Fonction pour détecter un code-barres dans une image
const detectBarcode = async (imageElement: HTMLImageElement) => {
  if (!('BarcodeDetector' in window) || !window.BarcodeDetector) {
    codeBarMessage.value.push('BarcodeDetector pas dispo sur ce browers');
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

      // si il y a un code bar detecté, on stop la camera et l'interval
      stopCamera();
      getBarcodeFromVideoInterval.pause();
    } else {
      // sinon on continue la detection tant que le composant est ouvert
      codeBarMessage.value.push('Aucun code-barres détecté');
    }
  } catch (error) {
    console.error('Erreur lors de la détection :', error);
    codeBarMessage.value.push(`Ereur lors de la détection: ${error}`);
  }
};

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
  getBarcodeFromVideoInterval.pause();
});
</script>

<style scoped></style>
