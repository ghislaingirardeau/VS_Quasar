# Service worker

## PWA

dev
`quasar dev -m pwa`

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

## Build and deploy github-page

Build PWA App inside /Dist
`quasar build -m pwa`

Ensuite, un repo distant dédié au déploiement de l'app sous github est créer ghislaingirardeau.github.io
Ce repo ne sert qu'à déployer le site > pour cela on va copier le 'build' > /Dist/pwa directement dans le root de ce repo !

Pour eviter de faire un copier coller des fichiers à chaque fois, on peut utiliser une librairie de transfert de fichier `push-dir`

Dans package.json  
`"deploy:pwa": "push-dir --dir=dist/pwa --remote=gh-pages --branch=main"`

> Commit le dossier dist/pwa dans le remote "gh-pages" qui a la branche main

Il faut donc ajouter le repo (utiliser pour le deploiement) comme repo dans ce meme projet > 1 remote 'origin' + 1 remote 'gh-pages'
