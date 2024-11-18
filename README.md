# Quasar App (quasar-vueschool)

A Quasar Project

## Quasar CLI

npm install -g @quasar/cli

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode

Run on App en mode SPA par défaut

```bash
quasar dev
```

Mais il existe d'autres modes :

SSR

```bash
quasar dev -m ssr
```

Application

```bash
quasar dev -m electron
```

Pour chaque autres modes que spa, cela va créer un dossier suppl `src-ssr` qui est le dossier gérer par quasar. Notre code vue et quasar va se faire essentiellement dans le dossier src, mais si on a besoin de faire quelques choses de spécifique sur le server, on pourra l'ajouter à cet endroit la !

### Lint the files

Pour eviter que les warning et error ne s'affiche coté browser
quasar.config.ts

```js
[
          'vite-plugin-checker',
          {
            vueTsc: {
              tsconfigPath: 'tsconfig.vue-tsc.json',
            },
            eslint: {
              lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"',
            },
            overlay: {
              initialIsOpen: false,
            },
          },
          { server: false },
        ],
```

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

## Build Android App

Avant, on aura besoin d'installer android studio

https://developer.android.com/studio?hl=fr

```bash
quasar dev -m capacitor -T android
```

Pour voir l'application directement sur mon telephone :
https://developer.android.com/studio/debug/dev-options?hl=fr

Suivre les étapes de:

- Activer les options pour les développeurs
- Activer le débogage USB sur votre appareil

**lors du branchement USB du telephone, mettre sur "transfert de fichier"**

Pour Débugger: aller sur Chrome et saisir **chrome://inspect#devices**

Et voila ! on peut maintenant développer notre application

## Quasar DOC

### Build your layout

![tool](https://quasar.dev/layout-builder)

copy and import inside your layout file

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
