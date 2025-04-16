import { register } from 'register-service-worker';
import { Notify } from 'quasar';
import { reloadWindow } from 'src/utils/index';
// import { updateDataFirestoreOnClose } from 'src/utils/firestore';

declare const window: Window & typeof globalThis;

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

// CONF BRANCHE Service_worker
// Écoute les messages envoyés par le Service Worker => soit par custom-service-worker
// quand tu recois ce message cela veut dire que la fenetre a été fermé. Met à jour firestore avec les dernieres datas enregistrées
// Mais cela ne va ce produire que si le service worker est actif, cad, si un autre onglet est ouvert !
/* navigator.serviceWorker.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'UPDATE_FIRESTORE') {
    console.log(
      "L'application a reçu une demande de mise à jour Firestore :",
      event.data.payload,
    );

    try {
      // updateDataFirestoreOnClose(event.data.payload);

      Notify.create({
        message: 'Mise à jour Firestore réussie !',
        color: 'positive',
        icon: 'check',
      });
    } catch (error) {
      console.error('Erreur Firestore :', error);
      Notify.create({
        message: 'Erreur de mise à jour Firestore',
        color: 'negative',
        icon: 'error',
      });
    }
  }
}); */

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready(/* registration */) {
    console.log('Service worker is active.');
  },

  registered(/* registration */) {
    // console.log('Service worker has been registered.');
  },

  cached(/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound(/* registration */) {
    // console.log('New content is downloading.')
    /* je ne mets pas de loader, car l'utilisateur pour toujours utiliser l'application pendant le chargement */
    Notify.create({
      message: 'Une mise à jour est en cours...',
      color: 'primary',
      icon: 'cloud_download',
      timeout: 5000,
      progress: true,
    });
  },

  updated(registration: ServiceWorkerRegistration) {
    // console.log('New content is available; please refresh.')
    Notify.create({
      message: "Mise à jour disponible ! Cliquez ici pour l'appliquer.",
      color: 'positive',
      icon: 'system_update',
      timeout: 5000,
      actions: [
        {
          label: 'Rafraîchir',
          color: 'white',
          handler: () => {
            reloadWindow();
          },
        },
      ],
    });
  },

  offline() {
    // console.log(
    //   'No internet connection found. App is running in offline mode.',
    // );
  },

  error(/* err */) {
    // console.error('Error during service worker registration:', err)
  },
});
