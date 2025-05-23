import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import IdPage from './IdPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { useLists } from 'src/stores/lists';
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import { openListDialog } from 'test/testUtils';
import { QuillEditor } from '@vueup/vue-quill';

installQuasarPlugin();

// Faire un mock du router => si on utilise useRoute, et notamment des données, j'ai besoin de celui-ci dans mon test
const routes = [
  {
    path: '/list/:id',
    name: 'list-id',
    component: IdPage,
  },
  // Ajoute d'autres routes si nécessaire
];

async function createList() {
  const listsStore = useLists();
  const { lists } = storeToRefs(listsStore);
  // Vérifier si la liste existe déjà
  const existingList = lists.value.find(
    (list) => list.name === 'Liste de course',
  );
  if (!existingList) {
    await listsStore.addList({
      id: 1,
      name: 'Liste de course',
      updated_at: null,
    });
  }
}

async function addItemInsideList(
  router: ReturnType<typeof createRouter>,
  wrapper: ReturnType<typeof mount>,
) {
  const listsStore = useLists();
  const { lists } = storeToRefs(listsStore);
  // Simulate data to enter
  const route = router.currentRoute.value;
  const itemForm = {
    title: 'test add item',
    id: Date.now(),
    description: '',
    list_id: Number(route.params.id),
    created_at: new Date(),
  };

  // add item in list
  await listsStore.addItemInList(itemForm);

  // check if item is added
  expect(lists.value[0].items).toHaveLength(1);

  // check if item is render inside dom
  const itemLabel = wrapper.find('.q-card .q-card__section .text-h5');
  expect(itemLabel.exists()).toBe(true);
  expect(itemLabel.text()).toContain('test add item');

  return wrapper;
}

describe('List Id page', async () => {
  let router: ReturnType<typeof createRouter>;
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;

  beforeEach(async () => {
    // Créer une liste pour pouvoir naviguer vers route 'list'
    await createList();

    router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // Simuler la navigation vers la route 'list'
    await router.push({ name: 'list-id', params: { id: '1' } });
    await router.isReady(); // Assurer que la navigation est prête

    // Monter le composant avec le routeur simulé
    wrapperLayout = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });

    // Monter le composant avec le routeur simulé
    wrapper = mount(IdPage, {
      global: {
        plugins: [router],
        components: { QuillEditor },
      },
    });
  });

  it('should receive the correct route param id', async () => {
    const route = router.currentRoute.value;
    expect(route.params.id).toBe('1');
  });

  it('should store contain on list', async () => {
    const listsStore = useLists();
    const { lists } = storeToRefs(listsStore);

    expect(lists.value).toHaveLength(1);
  });

  it('should open dialog', async () => {
    // Use utile test for open dialo
    await openListDialog(wrapperLayout, true, '1');
  });

  it('add an item inside list', async () => {
    // Check if item is added inside list
    await addItemInsideList(router, wrapper);
  });
});
