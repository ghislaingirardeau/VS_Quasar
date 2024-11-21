# Quasar App (quasar-vueschool)

A Quasar Project

## Quasar CLI

npm install -g @quasar/cli

### Start the app in development mode

![mode list](https://quasar.dev/quasar-cli-webpack/commands-list/)

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

## Quasar plugins

Plugins que l'on peut utiliser directement dans le JS et qui permettent d'afficher des éléments en fonction de l'éxécution du code

ex: `createItemForm.vue`
Au click sur la suppression d'un item, dans la fonction qui gere se clique on va pouvoir :

- ourvir une dialog de confirmation
- afficher le loader en attente d'une reponse backend
- afficher une notification de succès

## Installation de plugins tiers

### UnoCss

Si on veut installer des plugins externe, pour l'installation, il faut rechercher Vite. Quasar utilise Vite pour fonctionner!

Une fois le plugins installer:

Au lieu d'aller dans le fichier vite.config.js (qui n'existe pas sous quasar), on va utiliser quasar.config.ts puis aller sur la propiete `vitePlugins`

```js
vitePlugins: {
  // on vient y mettre l'import du plugins, puis les params de config si besoin
  ['unocss/vite', {}];
}
```

**Si on voit une référence à main.ts file pour l'installation, il faudra utiliser boot file pour quasar**

### Tailwind

```bash
npm install -D tailwindcss
npx tailwindcss init -p
```

creer le fichier .css avec les imports tailwinds

Ajouter le fichier css dans quasar config

**Ajouter dans le postcss.config.mjs, le plugins tailwinds via l'import du plugins**

```js
import tailwindcss from 'tailwindcss';
export default {
  plugins: [
    tailwindcss(),
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
