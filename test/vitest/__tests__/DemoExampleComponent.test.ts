import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ExampleComponent from './demo/ExampleComponent.vue';
import ChildComponent from './demo/ChildComponent.vue';

installQuasarPlugin();

describe('example Component', () => {
  it('should mount component with todos', async () => {
    // Monter le composant
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
      global: {
        stubs: {
          ChildComponent: true, // Stub du composant enfant
        },
      },
    });

    // Debug - afficher le HTML pour voir si q-item est présent
    console.log('HTML rendu:', wrapper.html());

    // Vérifier que le composant est monté correctement
    expect(wrapper.text()).toContain('Hello');
    expect(wrapper.text()).toContain('Hallo');

    //! Pas d'erreur sur wrapper.vm.XXX car dans le composant, on expose ces propriétés
    expect(wrapper.vm.isPassword).toBe(true);

    expect(wrapper.vm.clickCount).toBe(0);

    // Appeler directement la méthode
    wrapper.vm.increment();

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
    expect((wrapper.vm as any).clickCount).toBe(0);
    wrapper.findComponent(ChildComponent).vm.$emit('incrementFromChild');
    expect((wrapper.vm as any).clickCount).toBe(2);
    wrapper.findComponent(ChildComponent).vm.$emit('incrementFromChild');
    expect((wrapper.vm as any).clickCount).toBe(4);
  });
  it('should update count to parent', async () => {
    /* POUR CONTROLER QUE LE EMIT RENVOIE BIEN UN PAYLOAD*/
    const wrapperChild = mount(ChildComponent);

    await wrapperChild.find('button').trigger('click');
    await wrapperChild.find('button').trigger('click');
    await wrapperChild.find('button').trigger('click');

    const incrementEvent = wrapperChild.emitted('incrementFromChild');

    expect(incrementEvent).toHaveLength(3);
    expect((wrapperChild.vm as any).count).toBe(3);
  });
});
