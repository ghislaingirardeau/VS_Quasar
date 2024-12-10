import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShoppingCartWidget from 'src/components/shopping/ShoppingCartWidget.vue';
import LayoutHeader from 'src/components/shopping/LayoutHeader.vue';

import { setActivePinia, createPinia } from 'pinia';

installQuasarPlugin();

describe('layout shopping', () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach((): void => {
    vi.spyOn(window, 'alert');
    setActivePinia(createPinia());
    wrapper = mount(LayoutHeader);
  });
  it('should mount component properly', () => {
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.find('.q-toolbar__title').text()).toBe('Shopping List');
  });
  it('should mount cart widget', () => {
    const wrapperWidget = mount(ShoppingCartWidget);
    expect((wrapperWidget.vm as any).totalItems).toBe(0);
    expect(wrapper.exists()).to.be.true;
  });
});
