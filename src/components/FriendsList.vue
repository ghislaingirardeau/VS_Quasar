<template>
  <draggable
    v-model="friendsArray"
    tag="div"
    item-key="name"
    v-bind="dragOptions"
  >
    <template #item="{ element }">
      <q-list separator bordered padding>
        <q-item
          :key="element.id"
          :style="{ borderLeft: `6px solid ${element.color}` }"
          class="cursor-grab"
        >
          <q-item-section avatar>
            <q-avatar :color="element.color" text-color="white">
              {{ element.name[0] }}</q-avatar
            >
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ element.name }}
            </q-item-label>
            <q-item-label caption>
              {{ element.email }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div>
              <q-chip
                :label="isOSDetailsMap[element.os].label"
                :color="isOSDetailsMap[element.os].color"
                :icon="isOSDetailsMap[element.os].icon"
                class="text-white"
              />
              <q-icon :name="element.is_human ? mdiHuman : mdiDog" size="sm">
              </q-icon>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </draggable>
</template>

<script setup>
import { friends } from 'assets/friends.js';
import draggable from 'vuedraggable';
import {
  mdiHuman,
  mdiDog,
  mdiMicrosoft,
  mdiLinux,
  mdiApple,
} from '@quasar/extras/mdi-v7';
import { computed, ref } from 'vue';

/* SI JE VEUX METTRE EN FORME UN WIDGET A PARTIR D'UNE SEULE DONNEE
Je peux "map" un objet qui contiendra les différents proporiétés lié à cette donnée
dans le template, je ferais référence à la propriété en fonction de la donnée
ex: isOSDetailsMap[friend.os].icon
*/

const friendsArray = ref(Object.values(friends));

const isOSDetailsMap = {
  Windows: {
    label: 'Windows',
    color: 'grey',
    icon: mdiMicrosoft,
  },
  Apple: {
    label: 'Apple',
    color: 'blue',
    icon: mdiApple,
  },
  Linux: {
    label: 'Linux',
    color: 'purple',
    icon: mdiLinux,
  },
};

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});
</script>

<style lang="scss" scoped></style>
