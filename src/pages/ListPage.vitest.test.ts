import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ListPage from './ListPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { useItemList } from 'src/stores/itemList';

installQuasarPlugin();

// Faire un mock du router => si on utilise useRoute, et notamment des données, j'ai besoin de celui-ci dans mon test
const routes = [
  {
    path: '/list',
    name: 'list',
    component: ListPage,
    meta: {
      title: 'Liste',
    },
  },
  // Ajoute d'autres routes si nécessaire
];

describe('ListPage', () => {
  let router: ReturnType<typeof createRouter>;
  let wrapper: ReturnType<typeof mount>;

  beforeEach(async () => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // Monter le composant avec le routeur simulé
    wrapper = mount(ListPage, {
      global: {
        plugins: [router],
      },
    });

    // Simuler la navigation vers la route 'shopping'
    await router.push('/list');
    await router.isReady(); // Assurer que la navigation est prête
  });

  it('should listItems from store be defined', async () => {
    const itemList = useItemList();
    const { listItems } = storeToRefs(itemList);
    expect(listItems.value).toBeDefined();
  });
});
