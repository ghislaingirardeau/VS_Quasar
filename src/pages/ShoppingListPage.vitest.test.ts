import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import shoppingListPage from 'src/pages/shoppingListPage.vue';
import LayoutHeader from 'src/components/shopping/LayoutHeader.vue';
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import CleanCartWidget from 'src/components/shopping/CleanCartWidget.vue';

import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { useItemList } from 'src/stores/itemList';

installQuasarPlugin();

describe('shopping list', () => {
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;
  beforeEach((): void => {
    vi.spyOn(window, 'alert');

    setActivePinia(createPinia());

    wrapper = mount(shoppingListPage);
    wrapperLayout = mount(LayoutHeader);
  });

  function addItem() {
    wrapper.findComponent(ShoppingToolbar).vm.$emit('addNewItem');
  }
  it('should mount with empty list', async () => {
    /* Soit je fais le test via le store directement */
    const itemList = useItemList();
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
    expect((wrapper.vm as any).shoppingItems).toHaveLength(4);
    wrapperLayout.findComponent(EmptyCartWidget).vm.$emit('emptyCart');
    expect((wrapper.vm as any).shoppingItems).toHaveLength(0);
  });
});
