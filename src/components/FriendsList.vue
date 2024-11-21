<template>
  <q-list separator bordered padding>
    <q-item
      v-for="friend in Object.values(friends)"
      :key="friend.id"
      :style="{ borderLeft: `6px solid ${friend.color}` }"
    >
      <q-item-section avatar>
        <q-avatar :color="friend.color" text-color="white">
          {{ friend.name[0] }}</q-avatar
        >
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ friend.name }}
        </q-item-label>
        <q-item-label caption>
          {{ friend.email }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div>
          <q-chip
            :label="isOSDetailsMap[friend.os].label"
            :color="isOSDetailsMap[friend.os].color"
            :icon="isOSDetailsMap[friend.os].icon"
            class="text-white"
          />
          <q-icon :name="friend.is_human ? mdiHuman : mdiDog" size="sm">
          </q-icon>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { friends } from 'assets/friends.js';
import {
  mdiHuman,
  mdiDog,
  mdiMicrosoft,
  mdiLinux,
  mdiApple,
} from '@quasar/extras/mdi-v7';

/* SI JE VEUX METTRE EN FORME UN WIDGET A PARTIR D'UNE SEULE DONNEE
Je peux "map" un objet qui contiendra les différents proporiétés lié à cette donnée
dans le template, je ferais référence à la propriété en fonction de la donnée
ex: isOSDetailsMap[friend.os].icon
*/

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
</script>

<style lang="scss" scoped></style>
