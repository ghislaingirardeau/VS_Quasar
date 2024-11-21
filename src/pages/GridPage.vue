<template>
  <!-- Quasar automaticaly detect on which device user are & if touch is detected on the body tag
  ex: pour pc <body class="desktop no-touch body--light"></body> 
  ex: pour mobile  class="mobile touch platform-ios body--light"
  On peut alors utiliser la class .mobile et l'associer à une autre class en css pour donner un style particulier à un element sur mobile ou desktop
  -->
  <q-page>
    <div
      class="fit row wrap justify-around items-stretch content-start q-col-gutter-sm"
    >
      <!-- la col va prendre toute la hauteur de la row mais la div dans celle-ci pas forcément ! -->
      <div class="col-6 shadow-3 bg-red-6">
        <div class="bg-blue-4 full-height flex flex-center">
          <GoFullscreenBtn />
        </div>
      </div>
      <!-- bg-red-6 represente l'espace du gutter -->
      <div class="col-4 q-pa-md shadow-3 bg-red-6">
        <!-- scroll to hide over content and scroll bar -->
        <div class="lorem-card scroll relative-position" style="height: 150px">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quo
          corporis numquam ipsam, dignissimos harum suscipit qui vitae,
          praesentium et nam odio quos earum, quae modi quam. Fugiat, tempore
          quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Possimus quo corporis numquam ipsam, dignissimos harum suscipit qui
          vitae, praesentium et nam odio quos earum, quae modi quam. Fugiat,
          tempore quos.
          <!-- mobile-only: el sera visible seulement sur mobile
           mobile-hide: el sera masqué seulement sur mobile
            -->
          <q-btn
            fab
            :icon="mdiPlus"
            color="info absolute-top-right mobile-only"
          ></q-btn>
        </div>
      </div>
      <div class="col-4 offset-1 q-pa-md shadow-3">
        <q-card flat bordered class="my-card bg-custom relative-position">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
          <!-- Floating button a bit outside of the element -->
          <q-btn
            fab
            :icon="mdiPlus"
            color="info absolute"
            style="top: -10px; right: -10px"
          ></q-btn>
        </q-card>
      </div>
      <!-- "col" prendra la place restante dans une row de manière automatique -->
      <div class="col q-pa-md bg-blue-5 flex flex-center shadow-3">
        <q-icon size="xl" :name="mdiHomeAccount" color="custom"> </q-icon>
        <p>hello</p>
      </div>
      <!-- Working with floating button, position relative and absolute -->
      <!-- absolute: trouve le 1er element parent qui est relative -->
      <div class="col-4 q-pa-md shadow-3 relative-position">
        <q-card flat bordered class="my-card bg-custom">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
        <q-btn fab :icon="mdiPlus" color="info absolute-top-right"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// Pour charger une seule icone et non toute la librairie d'icones, le rendu sera simplement un SVG
import GoFullscreenBtn from 'components/GoFullscreenBtn.vue';

import { mdiHomeAccount, mdiPlus } from '@quasar/extras/mdi-v7';
</script>

<style scoped lang="scss">
.col-border {
  border: 2px solid $accent;
}
.mobile .lorem-card {
  background-color: $blue-3;
}
</style>
