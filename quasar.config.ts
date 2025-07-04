/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import 'dotenv/config';
// import fs from 'fs';

export default configure((ctx) => {
  return {
    supportTS: true,
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'i18n',
      'axios',
      'navigationGuards',
      'moment',
      'quillEditor',
      'firebase',
      'libraries' /* , 'unocss' */,
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss', 'tailwind.css'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    // Icons or font librairies you can include in quasar
    // juste besoin de decommenter les autres librairie si on souhaite les utiliser
    // material-icons est celui configurer par defaut
    // A COMBINER avec framework.config.iconset => pour préciser à quasar quelle librairie d'icone je veux utiliser
    // INCONVENIENT : cela à pour effet de télécharger tous le fichiers des icones depuis la librairie lors du chargment de l'app
    // Meilleurs solutions est d'utiliser l'import SVG d'icones directement dans le component en fonction de nos besoins ex: home page
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      extractCSS: true,
      polyfillModulePreload: true,
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      alias: {
        utils: path.resolve(__dirname, './src/utils'),
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      publicPath: ctx.dev ? '' : './',
      // analyze: true,
      env: {
        // ctx.dev identifie lui meme le mode dans le lequel nous sommes en fonction de la commande qu'on lance
        // ctx.dev === true => on est en mode dev => npm run dev
        // ctx.dev === false => on est en mode prod => npm run build
        API: ctx.dev
          ? 'https://jsonplaceholder.typicode.com'
          : 'https://jsonplaceholder.typicode.com',
        VAPIDKEY: process.env.VAPIDKEY,
        API_URL_WEBAUTH: ctx.dev
          ? 'http://localhost:3000/api'
          : 'https://shops-tools.onrender.com/api',
        APIKEY: process.env.APIKEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        APP_CRYPT_KEY: process.env.APP_CRYPT_KEY,
      },
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      vitePlugins: [
        // ['unocss/vite', {}],
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            // compositionOnly: false,

            // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
            // you need to set `runtimeOnly: false`
            // runtimeOnly: false,

            ssr: ctx.modeName === 'ssr',

            // you need to set i18n resource including paths !
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
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
      ],
      afterBuild: function (buildConfig) {
        // Pour le deploy sur Github Pages, on doit créer un fichier .nojekyll à la racine du dossier dist
        // if (buildConfig.quasarConf.pwa) {
        //   fs.writeFileSync('dist/pwa/.nojekyll', '');
        //   console.log('✓ .nojekyll file has been created');
        // }
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},

      iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['AppFullscreen', 'Notify', 'Dialog', 'Loading', 'Dark', 'Meta'],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [
      'fadeInRight',
      'fadeOutRight',
      'fadeIn',
      'fadeOut',
      'rotateIn',
      'rotateOut',
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    sourceFiles: {
      // rootComponent: 'src/App.vue',
      // router: 'src/router/index',
      // store: 'src/store/index',
      pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
      pwaServiceWorker: 'src-pwa/custom-service-worker',
      pwaManifestFile: 'src-pwa/manifest.json',
      // electronMain: 'src-electron/electron-main',
      // electronPreload: 'src-electron/electron-preload'
      // bexManifestFile: 'src-bex/manifest.json
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false,

      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    /**
     * GenerateSW > si on veut un SW basique > cache file, home app, offline
     * InjectManifest > si on veut plus de config notamment Web Push > alors on utilisera en plus custom-service-worker file
     */
    pwa: {
      workboxMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      cleanupOutdatedCaches: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: true,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      extendInjectManifestOptions(cfg) {
        cfg.swSrc = 'src-pwa/custom-service-worker.ts'; // FORCER le bon fichier SW
      },
      fallback: { 'index.html': 'index.html' },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar-vueschool',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},
    },
  };
});
