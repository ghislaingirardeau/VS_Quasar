<template>
  <div>
    <p>{{ title }}</p>
    <q-list>
      <q-item v-for="todo in todos" :key="todo.id" clickable @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </q-item>
    </q-list>
    <ChildComponent @increment-from-child="incrementFromChild" />

    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <p>{{ isPassword }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

interface Todo {
  id: number;
  content: string;
}

interface Meta {
  totalCount: number;
}

const props = withDefaults(
  defineProps<{
    title: string;
    todos?: Todo[];
    meta: Meta;
    active?: boolean;
  }>(),
  {
    todos: () => [],
  },
);

const clickCount = ref<number | null>(1);
const isPassword = ref(true);

function increment() {
  if (clickCount.value === null) {
    clickCount.value = 0;
  }
  clickCount.value += 1;
  return clickCount.value;
}

function incrementFromChild(payload: number) {
  if (clickCount.value === null) {
    clickCount.value = 0;
  }
  clickCount.value += 2;
  return clickCount.value;
}

const todoCount = computed(() => props.todos.length);

defineExpose({ increment, clickCount, isPassword });
</script>
