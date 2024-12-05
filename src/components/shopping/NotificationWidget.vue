<template>
  <q-btn
    v-if="hasToShowNotificationButton"
    size="sm"
    round
    :icon="mdiBell"
    class="q-ml-lg text-white"
    @click="requestNotificationPermission"
  >
  </q-btn>
</template>

<script setup lang="ts">
import { mdiBell } from '@quasar/extras/mdi-v7';
import { computed, onMounted, Ref, ref } from 'vue';

const permission: Ref<string | null> = ref(null);

const hasToShowNotificationButton = computed(() => {
  return permission.value !== 'granted';
});

const requestNotificationPermission = async () => {
  const autorisation = await Notification.requestPermission();
  if (autorisation === 'granted') permission.value = 'granted';
};

function notifyMe() {
  if (!('Notification' in window)) {
    alert('Ce navigateur ne prend pas en charge la notification de bureau');
    return;
  }

  if (Notification.permission === 'granted') {
    permission.value = 'granted';
    return;
  }

  if (Notification.permission === 'denied') {
    permission.value = 'denied';
    return;
  }
}

onMounted(() => {
  notifyMe();
});
</script>

<style scoped></style>
