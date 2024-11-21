<template>
  <div class="q-pa-md">
    <q-btn color="purple" label="Show Notifications" @click="showNotif" />
  </div>
</template>

<script setup>
import { Notify } from 'quasar';

// https://quasar.dev/quasar-plugins/notify#basic

function showNotif() {
  Notify.create({
    message: 'Jim just pinged you.',
    color: 'primary',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    actions: [
      {
        label: 'Dismiss',
        color: 'white',
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}
</script>
