import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import passwordInput from './passwordInput.vue';
import { describe, expect, it } from 'vitest';

installQuasarPlugin();

describe('passwordInput.vue', () => {
  it('should mount component', async () => {
    const wrapper = mount(passwordInput, {
      props: {
        password: '123456789',
      },
    });

    const hidePasswordButton = wrapper.find('i');
    expect((wrapper.vm as any).isPassword).toBe(true);
    await hidePasswordButton.trigger('click');
    expect((wrapper.vm as any).isPassword).toBe(false);
  });
});
