<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input v-model="dateInput" filled>
      <template #prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <!-- q-date & q-time recoivent le meme mask pour récuperer les datas -->
            <q-date
              v-model="dateInput"
              color="secondary"
              mask="YYYY-MM-DD HH:mm"
              class="dateTimeContainer"
              :events="events"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="secondary" flat />
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
                <q-btn v-close-popup label="Close" color="secondary" flat />
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

const today = date.formatDate(new Date(), 'YYYY/MM/DD');

const events = ref([today, '2024/11/28']);
</script>

<style lang="scss">
/* SI je veux personnaliser un element de quasar
ET le cibler que pour ce component 
SINON il sera dupliquer partout où q-date est utilisé car PAS SCOPED
*/
.dateTimeContainer .q-date__today {
  background-color: $blue-2;
}
</style>
