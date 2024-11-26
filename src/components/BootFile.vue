<template>
  <q-page class="q-pa-md">
    <!-- Use Fetch -->
    <q-card>
      <q-card-section> Use Fetch </q-card-section>
      <q-separator />
      <q-card-section style="height: 200px" class="scroll">
        <pre>{{ dataUseFetch }}</pre>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="handleUseFetch()">Call UseFetch</q-btn>
      </q-card-actions>
    </q-card>
    <!-- config pour Axios -->
    <q-card>
      <q-card-section> Fetch from Axios </q-card-section>
      <q-separator />
      <q-card-section style="height: 200px" class="scroll">
        <pre>{{ dataAxios }}</pre>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="handleAxiosFetch()">Call axios</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { api } from 'boot/axios';
import { useFetch } from '@vueuse/core';

import { ref } from 'vue';

const dataAxios = ref();
const dataUseFetch = ref();

async function handleAxiosFetch() {
  dataAxios.value = await api.get('/posts');
}

async function handleUseFetch() {
  const { isFetching, error, data } = await useFetch(
    process.env.API + '/users',
  );
  dataUseFetch.value = data.value;
}
</script>

<style lang="scss" scoped></style>
