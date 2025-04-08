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

### nojekyll

**Si bug sur Android, ajouter dans dist/pwa un fichier .nojekyll**
=> jekyll est utilisé par github
Jekyll ignore tous les fichiers et dossiers commençant par un underscore \_, ce qui peut poser problème si ton projet contient des fichiers comme \_nuxt/, \_assets/
Or Quasar peut générer ce type de dossier lors du build

### SW

une fois `npm run deploy:pwa` dans le terminal taper `echo "" >> dist/pwa/sw.js` pour forcer la MAJ de sw.js

dans le fichier **custo-service-worker.ts** changer `precacheAndRoute(devmode);` pour `precacheAndRoute(manifest);`
