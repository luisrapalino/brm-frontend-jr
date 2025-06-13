<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" sm="4">
        <v-card class="pa-4" variant="tonal" color="primary">
          <div class="d-flex align-center">
            <v-icon size="36" class="me-3">mdi-account-multiple</v-icon>
            <div>
              <div class="text-caption">Usuarios</div>
              <div class="text-h6 font-weight-bold">{{ totalUsuarios }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4" variant="tonal" color="secondary">
          <div class="d-flex align-center">
            <v-icon size="36" class="me-3">mdi-city</v-icon>
            <div>
              <div class="text-caption">Ciudades</div>
              <div class="text-h6 font-weight-bold">{{ totalCiudades }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-4" variant="tonal" color="success">
          <div class="d-flex align-center">
            <v-icon size="36" class="me-3">mdi-domain</v-icon>
            <div>
              <div class="text-caption">Compañías</div>
              <div class="text-h6 font-weight-bold">{{ totalEmpresas }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <BarChart :labels="labelsCiudad" :data="dataCiudad" :key="labelsCiudad.join(',') + dataCiudad.join(',')"
          title="Usuarios por Ciudad" />
      </v-col>
      <v-col cols="12" md="6">
        <PieChart :labels="labelsEmpresa" :data="dataEmpresa" :key="labelsEmpresa.join(',') + dataEmpresa.join(',')"
          title="Usuarios por Compañía" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type User } from '@/services/UserService';
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';

const props = defineProps<{
  users: User[];
}>();

const totalUsuarios = computed(() => props.users.length);

const totalCiudades = computed(() => {
  return new Set(props.users.map(u => u.address.city)).size;
});

const totalEmpresas = computed(() => {
  return new Set(props.users.map(u => u.company.name)).size;
});


const labelsCiudad = computed(() => {
  const ciudades = props.users.map(u => u.address.city);
  return [...new Set(ciudades)];
});

const dataCiudad = computed(() => {
  return labelsCiudad.value.map(ciudad =>
    props.users.filter(u => u.address.city === ciudad).length
  );
});

const labelsEmpresa = computed(() => {
  const empresas = props.users.map(u => u.company.name);
  return [...new Set(empresas)];
});

const dataEmpresa = computed(() => {
  return labelsEmpresa.value.map(empresa =>
    props.users.filter(u => u.company.name === empresa).length
  );
});
</script>
