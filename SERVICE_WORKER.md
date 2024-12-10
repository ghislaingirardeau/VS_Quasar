# Service worker

## PWA

dev
`quasar build -m pwa`

Cela créer alors un dossier src-pwa avec les 3 fichiers à decommenter

```js quasar.config.ts
sourceFiles: {
      pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
      pwaServiceWorker: 'src-pwa/custom-service-worker',
      pwaManifestFile: 'src-pwa/manifest.json',
    },
```

Les fichiers a configurer:

- quasar.config.ts
- src-pwa/manifest.json > icons, app name, app display...
- src-pwa/register-service-worker > gère le basic du service worker lors de son enregistrement
- src-pwa/custom-service-worker > pour personnaliser encore plus le SW (doit etre en mode InjectManifest)

## Quasar config

Défini le mode `workboxmode` à choisir pour la PWA:

- GenerateSW > si on veut un SW basique > cache file, home app, offline
- InjectManifest > si on veut plus de config notamment Web Push > alors on utilisera en plus `custom-service-worker` file

en `InjectManifest`, decommenter `extendInjectManifestOptions(cfg) {}`

## Web push

1- Enregistrer le service worker et l'envoyer au backend `subscription` endpoints (au chargement de l'app ici, MAIS CE FAIT SYSTEMATIQUEMENT ???)
2- Le backend a un endpoint `send-notification` pour envoyer la notification au service worker correspondant !
3- Le service worker écoute les évents `push` pour afficher la notification via `self.registration.showNotification`
4- On peut ensuite ajouter des options et callback en fonction de l'action sur la notification > `notificationclick` ou `notificationclose`
