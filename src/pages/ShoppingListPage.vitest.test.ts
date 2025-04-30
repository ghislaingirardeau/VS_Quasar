import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import shoppingListPage from 'src/pages/ShoppingPage.vue';
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';

import { storeToRefs } from 'pinia';
import { useShoppingItem } from 'src/stores/shoppingItems';
import ShoppingListPage from 'src/pages/ShoppingPage.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

installQuasarPlugin();

// Faire un mock du router => si on utilise useRoute, et notamment des données, j'ai besoin de celui-ci dans mon test
const routes = [
  {
    path: '/shopping',
    name: 'shopping',
    component: ShoppingListPage,
    meta: {
      title: 'Liste de course',
    },
  },
  // Ajoute d'autres routes si nécessaire
];

describe('shopping list', () => {
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    vi.spyOn(window, 'alert');

    // Créer le routeur avec une route mémoire
    router = createRouter({
      history: createMemoryHistory('/shopping'),
      routes,
    });

    // Simuler la navigation vers la route 'shopping'
    await router.push('/shopping');
    await router.isReady(); // Assurer que la navigation est prête

    // Monter le composant avec le routeur simulé
    wrapperLayout = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });
    wrapper = mount(shoppingListPage, {
      global: {
        plugins: [router],
      },
    });
  });

  function addItem() {
    wrapper.findComponent(ShoppingToolbar).vm.$emit('addNewItem');
  }

  it('should mount with empty list', async () => {
    /* Soit je fais le test via le store directement */
    const itemList = useShoppingItem();
    const { shoppingItems } = storeToRefs(itemList);
    expect(shoppingItems.value).toHaveLength(0);
  });

  it('should clear the list of purchased item', async () => {
    /* Soit je fais le test du store via l'appel de la props dans le component */
    addItem();
    (wrapper.vm as any).newItem.title = 'Lait';
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(2);
    (wrapper.vm as any).shoppingItems[0].is_purchased = true;
    const wrapperCleanCard: ReturnType<typeof mount> = mount(CleanCartWidget);
    (wrapperCleanCard.vm as any).cleanCart();
    wrapperLayout.findComponent(CleanCartWidget).vm.$emit('cleanCart');
    expect((wrapper.vm as any).shoppingItems).toHaveLength(1);
  });

  it('should not add item if already exist', async () => {
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(2);
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(2);
  });

  it('should create a new item in list when click on toolbar button', async () => {
    (wrapper.vm as any).newItem.title = 'Poire';
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(3);
    (wrapper.vm as any).newItem.title = 'Peche';
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(4);
  });

  it('should empty the list items', async () => {
    const itemList = useShoppingItem();
    const { shoppingItems } = storeToRefs(itemList);
    expect(shoppingItems.value).toHaveLength(4);
    const wrapperEmptyCard: ReturnType<typeof mount> = mount(EmptyCartWidget);
    (wrapperEmptyCard.vm as any).emptyCart();
    wrapperLayout.findComponent(EmptyCartWidget).vm.$emit('emptyCart');
    expect(shoppingItems.value).toHaveLength(0);
  });
});
