<template>
  <div style="height: 100vh" class="flex flex-center">
    <div class="q-gutter-lg">
      <q-btn
        label="Login"
        :icon="mdiLogin"
        color="primary"
        :loading="auth.logging"
        @click="handleLogin"
      />
      <q-btn
        label="Register"
        :icon="mdiLoginVariant"
        color="primary"
        @click="showdialog = true"
      />

      <q-knob
        v-model="value"
        :step="5"
        show-value
        size="90px"
        :thickness="0.22"
        color="orange"
        track-color="orange-3"
        class="text-orange q-ma-md"
      />
    </div>
    <!-- seamless: you can still click outside dialog and interact with app -->
    <q-dialog
      v-model="showdialog"
      transition-show="rotate"
      transition-hide="jump-up"
    >
      <div class="column">
        <q-card class="q-my-md">
          <q-bar class="bg-red-7 text-white">
            <q-card-section> Créer un compte </q-card-section>
            <q-space></q-space>
            <q-btn v-close-popup :icon="mdiWindowClose" dense flat />
          </q-bar>
        </q-card>
        <q-card style="height: 300px">
          <q-card-section>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            voluptatibus quis ipsam doloremque in totam excepturi architecto
            dignissimos quidem facere quasi cumque, voluptatum amet dolorem
            tenetur quod optio, odit distinctio.
          </q-card-section>
          <q-circular-progress
            indeterminate
            size="90px"
            :thickness="0.2"
            color="lime"
            center-color="grey-8"
            track-color="transparent"
            class="q-ma-md"
          />
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { mdiLogin, mdiWindowClose } from '@quasar/extras/mdi-v7';
import { useAuthTuto } from '../../stores/authTuto';
import { useRouter } from 'vue-router';
import { mdiLoginVariant } from '@quasar/extras/mdi-v4';
import { ref } from 'vue';

const auth = useAuthTuto();
const router = useRouter();

const showdialog = ref(false);
const value = ref(50);

async function handleLogin() {
  await auth.login();
  router.push({ name: 'homeTuto' });
}
</script>

<style scoped></style>
