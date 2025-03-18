import { boot } from 'quasar/wrappers';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default boot(async ({ app }) => {
  app.component('QuillEditor', QuillEditor);
});
