<template>
  <div class="d-flex align-center">
    <v-text-field v-model="searchTerm" label="Buscar por nombre" prepend-inner-icon="mdi-magnify" variant="outlined"
      density="comfortable" hide-details clearable class="flex-grow-1" />

    <v-menu v-model="menu" :close-on-content-click="false" location="bottom end">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ms-2" :color="hasActiveFilters ? 'primary' : 'grey-darken-1'">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>

      <v-card min-width="250" class="pa-4">
        <div class="text-subtitle-2 mb-2">Filtrar por</div>

        <v-select v-model="selectedCompanies" :items="companies" label="Compañías" multiple chips clearable hide-details
          density="comfortable" />

        <v-select v-model="selectedCities" :items="cities" label="Ciudades" multiple chips clearable hide-details
          density="comfortable" />

        <v-card-actions class="justify-end mt-2">
          <v-btn text @click="clearFilters">Limpiar</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits } from 'vue';
const menu = ref(false);

// Props
const props = defineProps<{
  modelValue: string;
  companies: string[];
  cities: string[];
}>();

// Emitimos cambios de filtros
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:filters', filters: { companies: string[]; cities: string[] }): void;
}>();

const searchTerm = ref(props.modelValue);
const selectedCompanies = ref<string[]>([]);
const selectedCities = ref<string[]>([]);

watch(() => props.modelValue, (newVal) => {
  searchTerm.value = newVal;
});

watch(searchTerm, (newVal) => {
  emit('update:modelValue', newVal);
});

watch([selectedCompanies, selectedCities], () => {
  emit('update:filters', {
    companies: selectedCompanies.value,
    cities: selectedCities.value,
  });
});

const hasActiveFilters = computed(() => selectedCompanies.value.length || selectedCities.value.length);

function clearFilters() {
  selectedCompanies.value = [];
  selectedCities.value = [];
}
</script>
