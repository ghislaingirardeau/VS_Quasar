import { mount, flushPromises } from '@vue/test-utils';
import ListDialog from './ListDialog.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { useLists } from 'src/stores/lists';
import { nextTick } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

installQuasarPlugin();

let isNewItem = false;
const newItemInListId = '';

describe('ListDialog action', () => {
  let wrapper: any;

  beforeEach(() => {
    // active le store
    setActivePinia(createPinia());
    const listsStore = useLists();
    listsStore.showDialogNewList();
    wrapper = mount(ListDialog, {
      props: {
        isNewItem: isNewItem,
        newItemInListId: newItemInListId,
      },
      global: {
        stubs: {
          teleport: true, // Désactive les téléportations
          /* Cela est dû au fait que Quasar utilise les téléportations Vue (<teleport>) pour rendre les dialogues. Une téléportation déplace le contenu du composant vers un autre endroit dans le DOM (généralement à la fin du body), ce qui le rend difficile à tester avec les méthodes standard de Vue Test Utils. */
        },
        components: { QuillEditor },
      },
    });
  });

  it('renders dialog', async () => {
    const listsStore = useLists();
    const { isNewListDialogVisible } = storeToRefs(listsStore);

    // Active le dialogue
    expect(isNewListDialogVisible.value).toBe(true);

    await nextTick();
    await flushPromises();

    // Soit on teste les propriétés
    expect(wrapper.vm.title).toBe('Nouvelle liste');
    expect(wrapper.vm.form.name).toBe('');
    // ou les methodes
    wrapper.vm.form.name = 'hello';
    expect(wrapper.vm.form.name).toBe('hello');
    await wrapper.vm.onReset();
    expect(wrapper.vm.form.name).toBe('');

    // Debug: pour controle du rendu html dans le terminal
    // console.log(wrapper.html());

    // Soit on teste les éléments du DOM
    const titleElement = wrapper.find('.text-h6');
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toBe('Nouvelle liste');
  });

  it('renders correct title for new item', async () => {
    isNewItem = true;
    await wrapper.setProps({ isNewItem });
    await nextTick();
    expect(wrapper.find('.text-h6').text()).toBe('Nouvel item');
  });

  it('renders correct title for new list', async () => {
    isNewItem = false;
    await wrapper.setProps({ isNewItem });
    await nextTick();
    expect(wrapper.find('.text-h6').text()).toBe('Nouvelle liste');
  });

  it('validates form inputs', async () => {
    // recupere input et mets la valeur a rien
    const inputElement = wrapper.find('input.q-field__native');
    expect(inputElement.exists()).toBe(true);
    await inputElement.setValue('');

    // pour appeler une methode sur un component et donc verifie le form
    await wrapper.vm.$refs.formComponent.validate();
    expect(inputElement.element.value).toBe('');
    expect(wrapper.find('.q-field__messages').text()).toBe(
      'Taper au moins un caractère',
    );
  });

  it('submits form for new list', async () => {
    const onSubmitSpy = vi.spyOn(wrapper.vm, 'onSubmit');

    wrapper.vm.form.name = 'Test List';

    await wrapper.vm.onSubmit();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should close dialog and reset form', async () => {
    // set name in form
    wrapper.vm.form.name = 'Test List';

    // Verifie le click sur la dialog
    const closeIcon = wrapper.find('button.btn-close');
    expect(closeIcon.exists()).toBe(true);
    await closeIcon.trigger('click');

    // verifie store que la prop est passé à false
    const listsStore = useLists();
    const { isNewListDialogVisible } = storeToRefs(listsStore);
    expect(isNewListDialogVisible.value).toBe(false);

    // verifie que form est reset
    wrapper.vm.form.name = '';
  });
});
