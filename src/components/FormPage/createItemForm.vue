<template>
  <!-- Form to add item -->
  <q-card class="q-mx-xl q-px-xl">
    <q-card-section>
      <q-form class="q-gutter-y-md" @submit="emit('create')">
        <q-input v-model="form.title" label="title" outlined />
        <q-input v-model="form.quantity" label="quantité" outlined />

        <q-input v-model="form.color" filled class="my-input">
          <template #append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="form.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-checkbox v-model="form.is_purchased" label="Purchased" />
        <q-select
          v-model="form.status"
          :options="['important', 'normal', 'urgent']"
          label="Status"
        />
        <q-btn label="Creer" type="submit" color="primary" class="full-width">
        </q-btn>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
const form = defineModel('form', { type: Object });
const emit = defineEmits(['create']);
</script>

<style lang="scss" scoped></style>
