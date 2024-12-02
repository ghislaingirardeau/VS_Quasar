import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import LayoutComponent from 'src/layouts/ShoppingLayout.vue';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';

import { setActivePinia, createPinia } from 'pinia';

installQuasarPlugin();

describe('layout shopping', () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach((): void => {
    setActivePinia(createPinia());
    wrapper = mount(LayoutComponent);
  });
  it('should mount component properly', () => {
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.find('h4').text()).toBe('Shopping List');
  });
  it('should mount cart widget', () => {
    const wrapperWidget = mount(ShoppingCartWidget);
    expect((wrapperWidget.vm as any).totalItems).toBe(0);
    expect(wrapper.exists()).to.be.true;
  });
});
