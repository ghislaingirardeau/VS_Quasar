import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import shoppingListPage from 'src/pages/shoppingListPage.vue';
import { categories } from 'src/assets/category.json';
import { setActivePinia, createPinia } from 'pinia';

installQuasarPlugin();

describe('toolbar', () => {
  let wrapperChild: ReturnType<typeof mount>;
  let wrapper: ReturnType<typeof mount>;
  beforeEach((): void => {
    setActivePinia(createPinia());

    wrapper = mount(shoppingListPage);
    wrapperChild = mount(ShoppingToolbar, {
      props: {
        newItem: {
          title: 'Pomme',
          quantity: 1,
          category: categories[0],
        },
        'onUpdate:newItem': (e: any) => wrapperChild.setProps({ newItem: e }),
      },
    });
  });
  it('should mount component properly', () => {
    expect(wrapperChild.exists()).to.be.true;
  });
  it('should emit event on click', async () => {
    const select = wrapperChild.find('.q-field input');
    await select.setValue('Canelle');
    const input = wrapperChild.find('.q-input input');
    await input.setValue('5');
    const addBtn = wrapperChild.find('.toolbar_add_button');
    await addBtn.trigger('click');
    expect(wrapperChild.emitted()).toHaveProperty('addNewItem');
  });
});
