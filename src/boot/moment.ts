import { boot } from 'quasar/wrappers';
import moment from 'moment';
import 'moment/dist/locale/fr';

export default boot(({ app }) => {
  // on peut attacher la lang à la langue du navigateur par ex
  // je peux parametrer le package ici avant de l'envoyer comme gobal dans vue
  // /!\ si je veux ensuite changer une propriété globale dans un des componsants, il faudra alors que l'app se update avec une key lié à la locale par ex
  moment.locale('fr');
  app.config.globalProperties.$moment = moment;
  // on n'utilise pas app.use() parce que moment n'est pas un plugins de vite !!
});

export { moment };
