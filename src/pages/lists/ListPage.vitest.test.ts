import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ListsPage from './ListsPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { useLists } from 'src/stores/lists';
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import deleteDialog from 'src/components/deleteDialog.vue';
import { openListDialog } from 'test/testUtils';
import { QuillEditor } from '@vueup/vue-quill';

installQuasarPlugin();

// Faire un mock du router => si on utilise useRoute, et notamment des données, j'ai besoin de celui-ci dans mon test
const routes = [
  {
    path: '/lists',
    name: 'lists',
    component: ListsPage,
    meta: {
      title: 'Listes',
    },
  },
  // Ajoute d'autres routes si nécessaire
];

async function createList() {
  const listsStore = useLists();
  const { lists } = storeToRefs(listsStore);

  expect(lists.value).toHaveLength(0);

  // Ajouter une liste pour pouvoir la supprimer
  await listsStore.addList({
    id: 1,
    name: 'new list',
    updated_at: null,
  });
  expect(lists.value).toHaveLength(1);
}

describe('Lists Page should display list of lists', () => {
  let router: ReturnType<typeof createRouter>;
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;

  beforeEach(async () => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory('/lists'),
      routes,
    });

    // Simuler la navigation vers la route 'list'
    await router.push('/lists');
    await router.isReady(); // Assurer que la navigation est prête

    // Monter le composant avec le routeur simulé
    wrapperLayout = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });

    // Monter le composant avec le routeur simulé
    wrapper = mount(ListsPage, {
      global: {
        plugins: [router],
        components: { QuillEditor },
      },
    });
  });

  it('should lists from store be defined', async () => {
    const itemList = useLists();
    const { lists } = storeToRefs(itemList);
    expect(lists.value).toBeDefined();
  });

  it('should create a new list', async () => {
    // Use utile test for open dialog
    await openListDialog(wrapperLayout, false, '');

    // Simulate create a new list
    await createList();

    // check if list is render inside dom
    const itemLabel = wrapper.find('.q-item__label');
    expect(itemLabel.exists()).toBe(true);
    expect(itemLabel.text()).toContain('new list');
  });

  it('should delete a list', async () => {
    const listsStore = useLists();
    const { lists } = storeToRefs(listsStore);

    // Trouver le bouton de suppression dans la liste
    const deleteButton = wrapper.find('i.icon-delete');
    expect(deleteButton.exists()).toBe(true);

    // Cliquer sur le bouton de suppression
    await deleteButton.trigger('click');

    // Monter le composant de confirmation de suppression
    const listDeleteDialog = wrapper.findComponent(deleteDialog);
    expect(listDeleteDialog.exists()).toBe(true);

    listDeleteDialog.vm.$emit('delete-element', 1);

    // check if list is deleted
    expect(lists.value).toHaveLength(0);
  });
});
