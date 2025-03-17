import { mount } from '@vue/test-utils';
import { storeToRefs } from 'pinia';
import { nextTick } from 'vue';
import { useLists } from 'src/stores/lists';
import AddItemWidget from 'src/components/list/AddItemWidget.vue';
import AddListWidget from 'src/components/list/AddListWidget.vue';

import ListDialog from 'src/components/list/ListDialog.vue';
import { expect } from 'vitest';

/**
 * Fonction utilitaire pour tester l'ouverture de la Dialog
 */
export async function openListDialog(
  wrapperLayout: ReturnType<typeof mount>,
  isNewItem: boolean,
  newItemInListId: string,
) {
  const listsStore = useLists();
  const { isNewListDialogVisible } = storeToRefs(listsStore);

  expect(isNewListDialogVisible.value).toBe(false);

  // Trouver le composant qui ouvre la Dialog
  const addItemWidget = wrapperLayout.findComponent(
    isNewItem ? AddItemWidget : AddListWidget,
  );
  expect(addItemWidget.exists()).toBe(true);

  // Cliquer sur le bouton pour ouvrir la Dialog
  await addItemWidget.find('button').trigger('click');

  // Vérifier que le store met bien à jour la variable
  expect(isNewListDialogVisible.value).toBe(true);

  // Monter la Dialog avec les props attendus
  const wrapperListDialog = mount(ListDialog, {
    props: {
      isNewItem,
      newItemInListId,
    },
  });

  await nextTick();
  expect(wrapperListDialog.exists()).toBe(true);

  return wrapperListDialog;
}
