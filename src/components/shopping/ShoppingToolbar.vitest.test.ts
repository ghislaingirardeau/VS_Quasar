import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShoppingToolbar from 'src/components/shopping/ShoppingToolbar.vue';
import { categories } from 'src/assets/category.json';

installQuasarPlugin();

describe('toolbar', () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach((): void => {
    vi.spyOn(window, 'alert');

    wrapper = mount(ShoppingToolbar, {
      props: {
        newItem: {
          title: '',
          quantity: 1,
          category: categories[0],
        },
        'onUpdate:newItem': (e: any) => wrapper.setProps({ newItem: e }),
      },
    });
  });
  it('should mount component properly', () => {
    expect(wrapper.exists()).to.be.true;
  });
  it('should have button disabled if no title item', () => {
    const addBtn = wrapper.find('.toolbar_add_button');
    expect(addBtn.attributes('disabled')).toBe('');
  });
  it('should emit event on click', async () => {
    const select = wrapper.find('.q-field input');
    await select.setValue('Canelle');
    const input = wrapper.find('.q-input input');
    await input.setValue('5');
    const addBtn = wrapper.find('.toolbar_add_button');
    await addBtn.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('addNewItem');
  });
});
