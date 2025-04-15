import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

/* BOOT FILE:
A utiliser un peu comme un systeme de plugins pour ajouter une route guard, injecter des variables globalement, rediriger, gérer une authentification...
Pourquoi ? parce que pas de fichier mains.js Vue 3. Donc si on veut ajouter des choses comme on le ferait dans vue 3, on va passer par le boot file
*/

export default boot(({ app, router, redirect }) => {
  router.afterEach((to, from) => {
    const toPath = to.path.split('/');
    const fromPath = from.path.split('/');

    if (toPath[1] === '') {
      to.meta.transition = 'slide-right';
      return;
    }
    if (toPath[1] === 'shopping' && fromPath[1] === 'wallet') {
      to.meta.transition = 'slide-right';
      return;
    }
    to.meta.transition =
      toPath.length < fromPath.length ? 'slide-right' : 'slide-left';
  });
});
