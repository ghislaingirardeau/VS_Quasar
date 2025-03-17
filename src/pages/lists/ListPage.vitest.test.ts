import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ListsPage from './ListsPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { useLists } from 'src/stores/lists';
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import AddListWidget from 'src/components/list/AddListWidget.vue';
import ListDialog from 'src/components/list/ListDialog.vue';
import ListDialogDelete from 'src/components/list/ListDialogDelete.vue';

import { nextTick } from 'vue';

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

  // Ajouter une liste pour pouvoir la supprimer
  await listsStore.addList({
    id: 1,
    name: 'Liste de course',
    updated_at: null,
  });
  expect(lists.value).toHaveLength(1);
}

describe('ListsPage', () => {
  let router: ReturnType<typeof createRouter>;
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;

  beforeEach(async () => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory('/lists'),
      routes,
    });

    // Monter le composant avec le routeur simulé
    wrapperLayout = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });

    // Monter le composant avec le routeur simulé
    wrapper = mount(ListsPage);

    // Simuler la navigation vers la route 'list'
    await router.push('/lists');
    await router.isReady(); // Assurer que la navigation est prête
  });

  it('should lists from store be defined', async () => {
    const itemList = useLists();
    const { lists } = storeToRefs(itemList);
    expect(lists.value).toBeDefined();
  });

  it('should create a new list', async () => {
    const listsStore = useLists();
    const { lists, isNewListDialogVisible } = storeToRefs(listsStore);
    expect(lists.value).toHaveLength(0);
    expect(isNewListDialogVisible.value).toBe(false);

    // Trouver le composant qui ouvre la Dialog
    const addListWidget = wrapperLayout.findComponent(AddListWidget);
    expect(addListWidget.exists()).toBe(true);

    // Cliquer sur le bouton pour ouvrir la Dialog
    await addListWidget.find('button').trigger('click');
    // Vérifier que le store met bien à jour la variable
    expect(isNewListDialogVisible.value).toBe(true);

    // Trouver la Dialog et attendre son affichage
    const listDialog = wrapper.findComponent(ListDialog);
    expect(listDialog.exists()).toBe(true);

    setTimeout(() => {
      // Vérifier si l'input est bien accessible après affichage
      const listNameInput = listDialog.find('input.form-list-name');
      expect(listNameInput.exists()).toBe(true);

      // Remplir l'input
      listNameInput.setValue('Liste de course');

      // Soumettre le formulaire
      listDialog.find('button[type=submit]').trigger('click');

      // Vérifier que la liste a bien été ajoutée
      expect(lists.value).toHaveLength(1);
    }, 50);
  });

  it('should delete a list', async () => {
    const listsStore = useLists();
    const { lists } = storeToRefs(listsStore);

    // Ajouter une liste pour pouvoir la supprimer
    await createList();

    await nextTick();

    // Trouver le bouton de suppression dans la liste
    const deleteButton = wrapper.find('i.icon-delete');
    expect(deleteButton.exists()).toBe(true);

    // Cliquer sur le bouton de suppression
    await deleteButton.trigger('click');

    // Monter le composant de confirmation de suppression
    const listDeleteDialog = wrapper.findComponent(ListDialogDelete);
    expect(listDeleteDialog.exists()).toBe(true);

    setTimeout(async () => {
      // Trouver le bouton de confirmation de suppression et cliquer dessus
      const confirmDeleteButton = listDeleteDialog.find(
        'button.confirm-delete',
      );
      expect(confirmDeleteButton.exists()).toBe(true);
      await confirmDeleteButton.trigger('click');

      // Vérifier que la liste a bien été supprimée
      expect(lists.value).toHaveLength(0);
    }, 100);
  });
});
