import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import shoppingListPage from 'src/pages/shoppingListPage.vue';
import LayoutHeader from 'src/components/shopping/LayoutHeader.vue';

import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';
import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { useItemList } from 'src/stores/itemList';

installQuasarPlugin();

describe('shopping list', () => {
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;
  beforeEach((): void => {
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
  it('should empty the list', async () => {
    /* Soit je fais le test du store via l'appel de la props dans le component */
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(1);
    wrapperLayout.findComponent(EmptyCartWidget).vm.$emit('emptyCart');
    expect((wrapper.vm as any).shoppingItems).toHaveLength(0);
  });
  it('should not add item if already exist', async () => {
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(1);
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(1);
  });
  it('should create a new item in list when click on toolbar button', async () => {
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(1);
    (wrapper.vm as any).newItem.title = 'Test';
    addItem();
    expect((wrapper.vm as any).shoppingItems).toHaveLength(2);
  });
});
