# Quasar App (quasar-vueschool)

A Quasar Project

- [Quasar App (quasar-vueschool)](#quasar-app-quasar-vueschool)
  - [Quasar CLI](#quasar-cli)
    - [Start the app in development mode](#start-the-app-in-development-mode)
    - [Lint the files](#lint-the-files)
    - [Path for Import](#path-for-import)
  - [Build Android App](#build-android-app)
  - [Quasar DOC](#quasar-doc)
    - [Build your layout](#build-your-layout)
    - [Build the app for production](#build-the-app-for-production)
  - [Quasar plugins](#quasar-plugins)
  - [Installation de plugins tiers](#installation-de-plugins-tiers)
    - [UnoCss](#unocss)
    - [Tailwind](#tailwind)
  - [assets VS public](#assets-vs-public)
  - [Quasar electron](#quasar-electron)

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

Web Application - on desktop

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

### Path for Import

**Lors de nos imports, on peut utiliser src/\* qui est intégré par quasar au lieu de @/...**

Si on veut tout de meme personnaliser nos chemins d'import

```js quasr.config
import path from 'node:path';

build: {
  alias: {
        utils: path.resolve(__dirname, './src/utils'),
      },
}
```

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "utils/*": ["src/utils/*"] // ou @utils
    }
  },
```

```js
// plsu besoin du src dans ce cas là !
import { randomNumber } from 'utils/index';
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

## assets VS public

assets => Relative URLs - sont interprété comme un module et auront donc une URL auto généré

`<img src="~assets/logo.png">` pour afficher une image dans assets, utilise **~ et /**

public => Root-relative URLs - aucun process n'est fait dessus

`<q-img src="image.jpg">` pas besoin du **/** si dans le dossier public

_Files in the “assets” folder are only included in your build if they have a literal reference in one of your Vue files. Every file and folder from the “public” folder are copied into your production build as-is, no matter what._

## Quasar electron

Electron permet de creer des applications web pour desktop.

Attention l'application a alors accès à des éléments de l'ordinateur de l'utilisateur. Il faut donc faire attention à ne donner l'accès qu'a certains éléments gràce notamment au "bridge" qui va faire le lien entre l'application et le PC

Pour cela dans `src-electron`, electron fournit 2 fichiers notamment:

- electron-main.ts: logique concernant les éléments du PC **Dangerous**
- electron-preload.ts: qui sert de "bridge" entre le code dans .vue et le main electron

```js vue
window.notification.show({
  title: 'Hello world',
  body: 'Notification from web app',
});
```

```ts electron-main
function showNotification(
  _event: Event,
  { title, body }: { title: string; body: string },
) {
  const notification = new Notification({ title, body });
  notification.show();
}

// Inter Process Communication
// Pour dire au bridge, "hey bridge, cette fonction existe et permet de montrer une authentification sur l'ordi"
ipcMain.handle('notification:show', showNotification);
```

```ts electron-preload (bridge)
// Expose 'notification' on window object inside vue component has a property
// We can now access to window.notification inside our code to execute this bridge
contextBridge.exposeInMainWorld('notification', {
  show: ({ title, body }: { title: string; body: string }) => {
    // Va chercher dans electron-main, le handler qui a pour nom notification:show
    // et je lui envoie en params l'objet
    ipcRenderer.invoke('notification:show', { title, body });
  },
});
```

**PRO/CON than using native webAPI new Notification(). Exemple, si on veut que ajouter un bouton dans la notification pour que l'utilisateur répond ? (pas possible avec native notification)! OU rendu commun quelque soit l'OS, or si on veut personnaliser, pas possible**

Electron va offrir plus de possibilités si on veut aller plus loin dans les fonctionnalités de la notification
