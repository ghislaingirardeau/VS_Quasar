import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import shoppingListPage from 'src/pages/shoppingListPage.vue';
import LayoutComponent from 'src/layouts/ShoppingLayout.vue';
import EmptyCartWidget from 'src/components/shopping/EmptyCartWidget.vue';

installQuasarPlugin();

describe('shopping list', () => {
  let wrapper: ReturnType<typeof mount>;
  let wrapperLayout: ReturnType<typeof mount>;
  beforeEach((): void => {
    wrapper = mount(shoppingListPage);
    wrapperLayout = mount(LayoutComponent);
  });

  function addItem() {
    wrapper.findComponent(ShoppingToolbar).vm.$emit('addNewItem');
  }
  it('should mount with empty list', async () => {
    expect(wrapper.vm.shoppingItems).toHaveLength(0);
  });
  it('should mount empty the list', async () => {
    addItem();
    expect(wrapper.vm.shoppingItems).toHaveLength(1);
    wrapperLayout.findComponent(EmptyCartWidget).vm.$emit('emptyCart');
    expect(wrapperLayout.vm.shoppingItems).toHaveLength(0);
  });
  it('should create a new item in list when click on toolbar button', async () => {
    addItem();
    expect(wrapper.vm.shoppingItems).toHaveLength(1);
    wrapper.vm.newItem.title = 'Test';
    addItem();
    expect(wrapper.vm.shoppingItems).toHaveLength(2);
  });
});
