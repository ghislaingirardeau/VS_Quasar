<template>
  <div>
    <q-btn
      v-if="registerButton"
      size="sm"
      round
      :loading="loading"
      :icon="mdiAccountPlus"
      class="q-ml-sm text-white"
      @click="handleRegisterCredential"
    >
    </q-btn>
    <q-btn
      v-if="authenticateButton"
      size="sm"
      round
      :loading="loading"
      :icon="mdiLogin"
      class="q-ml-sm text-white"
      @click="handleAuthenticate"
    >
    </q-btn>
    <q-btn
      v-if="deleteButton"
      size="sm"
      round
      :loading="loading"
      color="red-5"
      :icon="mdiTrashCanOutline"
      class="q-ml-sm text-white"
      @click="removeCredential"
    >
    </q-btn>
    <q-dialog v-model="dialogInformation">
      <q-card>
        <q-card-section>
          <div class="text-h6">Information Authentification</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ dialogInformationMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {
  mdiAccountPlus,
  mdiLogin,
  mdiLogout,
  mdiTrashCanOutline,
} from '@quasar/extras/mdi-v7';
import { onMounted, ref } from 'vue';

const dialogInformation = ref(false);
const dialogInformationMessage = ref('');
const loading = ref(false);
const registerButton = ref(true);
const authenticateButton = ref(false);
const deleteButton = ref(false);

console.log(process.env.API_URL_WEBAUTH);

const bufferToBase64 = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ToBuffer = (base64) =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

onMounted(() => {
  const hasCredential = localStorage.getItem('credential') !== null;

  if (hasCredential) {
    authenticateButton.value = true;
    deleteButton.value = true;
    registerButton.value = false;
  } else {
    registerButton.value = true;
  }
});

async function handleRegisterCredential() {
  loading.value = true;

  try {
    const credentialCreationOptions = await (
      await fetch(`${process.env.API_URL_WEBAUTH}/registration-options`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();

    credentialCreationOptions.challenge = new Uint8Array(
      credentialCreationOptions.challenge.data,
    );
    credentialCreationOptions.user.id = new Uint8Array(
      credentialCreationOptions.user.id.data,
    );
    credentialCreationOptions.user.name = 'mypwa@example.com';
    credentialCreationOptions.user.displayName = 'my pwa auth test';

    const credential = await navigator.credentials.create({
      publicKey: credentialCreationOptions,
    });

    const credentialId = bufferToBase64(credential.rawId);

    localStorage.setItem('credential', JSON.stringify({ credentialId }));

    const data = {
      rawId: credentialId,
      response: {
        attestationObject: bufferToBase64(
          credential.response.attestationObject,
        ),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
        id: credential.id,
        type: credential.type,
      },
    };

    await (
      await fetch(`${process.env.API_URL_WEBAUTH}/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: data }),
        credentials: 'include',
      })
    ).json();

    loading.value = false;

    registerButton.value = false;
    authenticateButton.value = true;
    deleteButton.value = true;

    dialogInformationMessage.value = 'Registration successful!';
    dialogInformation.value = true;
  } catch (e) {
    console.error('registration failed', e);

    dialogInformationMessage.value = 'Registration failed';
    dialogInformation.value = true;
  } finally {
    loading.value = false;
  }
}

async function handleAuthenticate() {
  loading.value = true;

  try {
    const credentialRequestOptions = await (
      await fetch(`${process.env.API_URL_WEBAUTH}/authentication-options`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    ).json();

    const { credentialId } = JSON.parse(localStorage.getItem('credential'));

    credentialRequestOptions.challenge = new Uint8Array(
      credentialRequestOptions.challenge.data,
    );
    credentialRequestOptions.allowCredentials = [
      {
        id: base64ToBuffer(credentialId),
        type: 'public-key',
        transports: ['internal'],
      },
    ];

    const credential = await navigator.credentials.get({
      publicKey: credentialRequestOptions,
    });

    const data = {
      rawId: bufferToBase64(credential.rawId),
      response: {
        authenticatorData: bufferToBase64(
          credential.response.authenticatorData,
        ),
        signature: bufferToBase64(credential.response.signature),
        userHandle: bufferToBase64(credential.response.userHandle),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
        id: credential.id,
        type: credential.type,
      },
    };

    const response = await fetch(
      `${process.env.API_URL_WEBAUTH}/authenticate`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: data }),
        credentials: 'include',
      },
    );

    if (response.status === 404) {
      dialogInformationMessage.value =
        'Credential has expired, please register a new credential';
      dialogInformation.value = true;
      removeCredential();
    } else {
      const assertionResponse = await response.json();

      console.log('authenticate ok', assertionResponse);

      dialogInformationMessage.value = 'Authentication successful!';
      dialogInformation.value = true;
    }
  } catch (e) {
    console.error('authentication failed', e);

    dialogInformationMessage.value = 'Authentication failed';
    dialogInformation.value = true;
  } finally {
    loading.value = false;
  }
}

function removeCredential() {
  localStorage.removeItem('credential');

  registerButton.value = true;
  authenticateButton.value = false;
  deleteButton.value = false;
}
</script>

<style scoped></style>
