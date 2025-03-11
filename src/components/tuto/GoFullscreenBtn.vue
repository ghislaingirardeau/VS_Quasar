<template>
  <q-btn
    color="secondary"
    :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
    :label="$q.fullscreen.isActive ? 'Exit Fullscreen' : 'Go Fullscreen'"
    @click="$q.fullscreen.toggle()"
  />
</template>

<script setup></script>
