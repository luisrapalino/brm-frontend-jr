<template>
  <v-dialog v-model="isOpen" width="500" transition="dialog-bottom-transition" persistent>
    <v-card class="rounded-lg" elevation="8">
      <!-- Header con título + X alineados -->
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-icon class="me-2 text-grey-darken-1">mdi-information-outline</v-icon>
          <span class="text-h6">Detalles de {{ user?.name }}</span>
        </div>

        <v-btn icon @click="close" variant="text">
          <v-icon class="text-grey-darken-1">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <!-- Contenido -->
      <v-card-text v-if="user">
        <v-list lines="one" density="compact">
          <v-list-item>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-2 text-grey-darken-1">mdi-email</v-icon>
              {{ user.email }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-2 text-grey-darken-1">mdi-phone</v-icon>
              {{ user.phone }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-2 text-grey-darken-1">mdi-map-marker</v-icon>
              {{ user.address.street }}, {{ user.address.city }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-2 text-grey-darken-1">mdi-domain</v-icon>
              {{ user.company.name }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-2 text-grey-darken-1">mdi-web</v-icon>
              <a :href="'https://' + user.website" target="_blank">{{ user.website }}</a>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { User } from '@/services/UserService';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  user: User | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
});

const close = () => {
  emit('update:modelValue', false);
};
</script>
