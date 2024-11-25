<template>
  <q-footer bordered class="bg-grey-8 text-white">
    <q-toolbar class="flex-center">
      <p>{{ today }}</p>
      <q-btn icon="person" size="lg" color="warning" />
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
// import moment from 'moment';
import { computed } from 'vue';
// const today = computed(() => moment().format('dddd DD MMMM YYYY'));

// CON Inject => erreur de type sur moment lors de son utilisation
// import { computed, inject } from 'vue';
// const moment = inject('moment');

import { moment } from '../boot/moment';
const today = computed(() => moment().format('dddd DD MMMM YYYY'));
</script>

<style scoped></style>
