<template>
  <!-- Util pour mettre un loader uniquement sur une carte et rafraichir son contenu par exemple -->
  <div class="q-pa-md q-gutter-md">
    <q-btn color="primary" @click="showTextLoading"> Show it </q-btn>

    <q-card class="relative-position card-example" flat bordered>
      <q-card-section class="q-pb-none">
        <div class="text-h6">Lorem Ipsum</div>
      </q-card-section>

      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-scroll-area style="height: 200px">
            <div v-show="showSimulatedReturnData">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel magna eu risus laoreet tristique. Nulla ut fermentum elit, nec
              consequat augue. Morbi et dolor nec metus tincidunt pellentesque.
              Nullam non semper ante. Fusce pellentesque sagittis felis quis
              porta. Aenean condimentum neque sed erat suscipit malesuada. Nulla
              eget rhoncus enim. Duis dictum interdum eros.
            </div>
          </q-scroll-area>
        </transition>
      </q-card-section>

      <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const showSimulatedReturnData = ref(false);

function showTextLoading() {
  visible.value = true;
  showSimulatedReturnData.value = false;

  setTimeout(() => {
    visible.value = false;
    showSimulatedReturnData.value = true;
  }, 1500);
}
</script>

<style lang="sass" scoped></style>
