<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input v-model="dateInput" filled>
      <template #prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <!-- q-date & q-time recoivent le meme mask pour récuperer les datas -->
            <q-date v-model="dateInput" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template #append>
        <q-icon name="access_time" class="cursor-pointer">
          <!-- proxy => va s'adapter suivant mobile ou non, si mobile dialog sinon popup -->
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="dateInput" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { date } from 'quasar';

const newDate = date.formatDate(new Date(), 'YYYY-MM-DD HH:mm');
const dateInput = ref(newDate);
</script>
