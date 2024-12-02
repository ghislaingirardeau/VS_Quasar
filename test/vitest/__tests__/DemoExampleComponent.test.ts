import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import ExampleComponent from './demo/ExampleComponent.vue';
import ChildComponent from './demo/ChildComponent.vue';

installQuasarPlugin();

describe('example Component', () => {
  it('should mount component with todos', async () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
        todos: [
          { id: 1, content: 'Hallo' },
          { id: 2, content: 'Hoi' },
        ],
      },
    });
    expect(wrapper.vm.clickCount).toBe(0);
    await wrapper.find('.q-item').trigger('click');
    expect(wrapper.vm.clickCount).toBe(1);
  });

  it('should mount component without todos', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
      },
    });
    expect(wrapper.findAll('.q-item')).toHaveLength(0);
  });
  it('should increment counter from child component', async () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        meta: {
          totalCount: 4,
        },
      },
    });

    /* POUR CONTROLER LE RENDU DU EMIT DANS LE COMPONENT PARENT */
    expect(wrapper.vm.clickCount).toBe(0);
    wrapper.findComponent(ChildComponent).vm.$emit('incrementFromChild');
    expect(wrapper.vm.clickCount).toBe(2);
    wrapper.findComponent(ChildComponent).vm.$emit('incrementFromChild');
    expect(wrapper.vm.clickCount).toBe(4);
  });
  it('should update count to parent', async () => {
    /* POUR CONTROLER QUE LE EMIT RENVOIE BIEN UN PAYLOAD*/
    const wrapperChild = mount(ChildComponent);

    await wrapperChild.find('button').trigger('click');
    await wrapperChild.find('button').trigger('click');
    await wrapperChild.find('button').trigger('click');

    const incrementEvent = wrapperChild.emitted('incrementFromChild');

    expect(incrementEvent).toHaveLength(3);
    expect(wrapperChild.vm.count).toBe(3);
  });
});
