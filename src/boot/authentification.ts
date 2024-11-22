import { boot } from 'quasar/wrappers';
import { useAuth } from '../stores/auth';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

/* BOOT FILE:
A utiliser un peu comme un systeme de plugins pour ajouter une route guard, injecter des variables globalement, rediriger, gérer une authentification...
Pourquoi ? parce que pas de fichier mains.js Vue 3. Donc si on veut ajouter des choses comme on le ferait dans vue 3, on va passer par le boot file
*/

export default boot(({ app, router, redirect }) => {
  router.beforeEach((to, from, next) => {
    console.log(to);
    const auth = useAuth();
    // dans routes.js, sur les routes ayant besoin d'une auth, on rajoute une prop qui est un boolean à true
    if (!auth.loggedIn && to.matched.some((route) => route.meta.requiresAuth)) {
      redirect('/auth/login');
    }
    next();
  });
});
