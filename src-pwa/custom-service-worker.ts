/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config file > pwa > workboxMode is set to "InjectManifest"
 */

declare const self: ServiceWorkerGlobalScope &
  typeof globalThis & { skipWaiting: () => void };

interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
}

import { clientsClaim } from 'workbox-core';
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

// Use with precache injection
// DEBUG: manifest en mode dev pwa

// EN PROD
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

// EN DEV
// const fallbackHtml = 'index.html';
// const additionalManifest = [{ url: fallbackHtml, revision: null }];
// const devmode = [...manifest, ...additionalManifest];
// precacheAndRoute(devmode);

cleanupOutdatedCaches();

const fallbackUrl = process.env.PWA_FALLBACK_HTML || '/index.html';

// Non-SSR fallbacks to index.html
// Production SSR fallbacks to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(fallbackUrl), //process.env.PWA_FALLBACK_HTML
      {
        denylist: [
          new RegExp(process.env.PWA_SERVICE_WORKER_REGEX),
          /workbox-(.)*\.js$/,
        ],
      },
    ),
  );
}

// ✅ Ajout de la gestion de mise à jour du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installé.');
  self.skipWaiting(); // Force l'installation immédiate
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activé.');
  event.waitUntil(
    // clients.claim: prend le controle de toutes les fenetres ouvertes / connectées pour un meme utilisateur
    self.clients.claim().then(() => {
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'UPDATE_AVAILABLE' });
        });
      });
    }),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* -------- PENDING SYNCHRO DONNEE IF NOT CONNECTED: Événement de Background Sync (lorsque le réseau revient) ----------------*/

self.addEventListener('sync', (event) => {
  const syncEvent = event as SyncEvent;

  if (syncEvent.tag === 'sync-firestore') {
    // quand le service worker est installé et que la connexion est rétablie
    // waitUntil: indique au navigateur que l’événement ne doit pas se terminer tant que la Promise passée n’est pas résolue.
    syncEvent.waitUntil(notifyClientToUpdateFirestore());
  }
});

async function notifyClientToUpdateFirestore() {
  // On envoie le message à tous les clients ouverts
  // dans le layout HomePage => on a un ecouteur qui attend le message de type PROCESS_FIRESTORE_QUEUE
  const allClients = await self.clients.matchAll({ includeUncontrolled: true });
  allClients.forEach((client) => {
    client.postMessage({ type: 'PROCESS_FIRESTORE_QUEUE' });
  });
}

/* ------------------ Message recu depuis l'application ----------------------------- */

// ici depuis le boot firebase
/* self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SAVE_TO_FIRESTORE') {
    console.log('Service Worker a reçu une demande de mise à jour Firestore.');

    // On envoie le message à tous les clients ouverts
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'UPDATE_FIRESTORE',
          payload: event.data.payload, // Les données à enregistrer
        });
      });
    });
  }
}); */
