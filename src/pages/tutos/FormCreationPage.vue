<template>
  <q-page padding>
    <q-card v-for="(formItem, index) in formItems" :key="index">
      <q-card-section>
        <q-select
          v-if="canEditForm"
          v-model="formItem.selection"
          :options="[
            { label: 'Short answer', value: 'text', type: 'input' },
            { label: 'Long answer', value: 'textarea', type: 'input' },
            { label: 'Email', value: 'email', type: 'input' },
            { label: 'Password', value: 'password', type: 'input' },
            { label: 'Date', value: 'date', type: 'input' },
            { label: 'Checkbox', value: 'checkbox', type: 'checkbox' },
            { label: 'File', value: 'file', type: 'file' },
            { label: 'color', value: 'color', type: 'color' },
          ]"
          label="Select an option"
        ></q-select>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="formItem.question"
          class="text-xl font-bold"
          type="text"
          placeholder="Question"
          :readonly="!canEditForm"
        />
      </q-card-section>
      <q-card-section>
        <!-- input -->
        <q-input
          v-if="formItem.selection.type === 'input'"
          v-model="formItem.inputValue"
          :type="formItem.selection.value"
          :placeholder="formItem.selection.label"
        />

        <!-- checkbox -->
        <div v-if="formItem.selection.type === 'checkbox'">
          <q-btn
            v-if="canEditForm"
            round
            color="primary"
            class="cursor-pointer mt-2"
            size="xs"
            :icon="mdiPlus"
            @click="
              formItem.checkBoxes.push({
                label: `Option ${formItem.checkBoxes.length + 1}`,
                value: false,
              })
            "
          />
          <div
            v-for="(checkbox, i) in formItem.checkBoxes"
            :key="'checkbox' + i"
            class="flex"
          >
            <q-checkbox v-model="checkbox.value" />
            <q-input
              v-model="checkbox.label"
              type="text"
              :readonly="!canEditForm"
            />
          </div>
        </div>

        <!-- file -->
        <q-file
          v-if="formItem.selection.type === 'file' && canEditForm"
          v-model="formItem.file"
          label="Pick one file"
          filled
          style="max-width: 300px"
        />
        <p v-if="formItem.selection.type === 'file' && !canEditForm">
          File preview
        </p>

        <!-- color picker -->
        <q-color
          v-if="formItem.selection.type === 'color' && canEditForm"
          v-model="formItem.color"
          class="my-picker"
        />
        <div
          v-if="formItem.selection.type === 'color' && !canEditForm"
          class="w-20 h-10"
          :style="{ backgroundColor: formItem.color || '#ffffff' }"
        ></div>
      </q-card-section>
    </q-card>
    {{ formItems }}
    <q-page-sticky
      :offset="[22, 22]"
      position="bottom-right"
      style="z-index: 9999 !important"
    >
      <q-btn
        round
        color="primary"
        class="cursor-pointer floating"
        :icon="mdiPlus"
        @click="addNewFormCard"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { mdiPlus } from '@quasar/extras/mdi-v7';
import { ref } from 'vue';

interface Selection {
  label: string;
  value: 'text' | 'email' | 'password' | 'textarea';
  type: string;
}

const canEditForm = ref(true);

const formItems = ref([
  {
    selection: {
      label: 'Short answer',
      value: 'text',
      type: 'input',
    } as Selection,
    question: '',
    inputValue: '',
    checkBoxes: [{ label: 'Option 1', value: false }],
    file: null,
    color: null,
  },
]);

function addNewFormCard() {
  formItems.value.push({
    selection: {
      label: 'Short answer',
      value: 'text',
      type: 'input',
    } as Selection,
    question: '',
    inputValue: '',
    checkBoxes: [{ label: 'Option 1', value: false }],
    file: null,
    color: null,
  });
}
</script>

<style scoped></style>
