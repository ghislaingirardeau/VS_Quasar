import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';
import LayoutHeader from 'src/components/layouts/LayoutHeader.vue';

import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import ShoppingListPage from 'src/pages/ShoppingPage.vue';

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

describe('layout shopping', () => {
  let wrapper: ReturnType<typeof mount>;
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    vi.spyOn(window, 'alert');

    // active le store
    setActivePinia(createPinia());

    // Créer le routeur avec une route mémoire
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    // Simuler la navigation vers la route 'shopping'
    await router.push('/shopping');
    await router.isReady(); // Assurer que la navigation est prête

    // Monter le composant avec le routeur simulé
    wrapper = mount(LayoutHeader, {
      global: {
        plugins: [router],
      },
    });
  });

  it('should mount component properly', async () => {
    // Attendre que le DOM soit mis à jour
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.find('.q-toolbar__title').text()).toBe('Liste de course');
  });

  it('should mount cart widget', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('mount empty cart widget', () => {
    const wrapperEmptyCart = mount(EmptyCartWidget);
    expect(wrapperEmptyCart.exists()).to.be.true;
  });

  it('mount clean cart widget', () => {
    const wrapperCleanCart = mount(CleanCartWidget);
    expect((wrapperCleanCart.vm as any).totalItems).toBe(0);
    expect(wrapperCleanCart.exists()).to.be.true;
  });

  // already test in shoppping page
  it.skip('should emit cleanCart event when button is clicked', async () => {
    const wrapperCleanCart = mount(CleanCartWidget);
    const cleanCart = vi.spyOn(wrapperCleanCart.vm as any, 'cleanCart');

    await wrapperCleanCart.find('button').trigger('click');

    expect(cleanCart).toHaveBeenCalled();
  });
});
