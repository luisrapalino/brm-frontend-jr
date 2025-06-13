<template>
  <v-container>
    <!-- Busqueda y Filtros -->
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <SearchBar :model-value="search ?? ''" :companies="companies" :cities="cities"
          @update:filters="filters = $event" @update:modelValue="search = $event ?? ''" />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="2">
        <v-select v-model="sortBy" :items="sortOptions" label="Ordenar por" density="comfortable" clearable
          variant="outlined" prepend-inner-icon="mdi-sort" />
      </v-col>
      <v-col cols="12" md="4" offset-md="6" class="text-end">
        <v-btn color="primary" variant="outlined" prepend-icon="mdi-download" @click="descargarCSV"
          :disabled="filteredUsers.length === 0">
          Exportar CSV
        </v-btn>
        <v-btn color="primary" variant="outlined" prepend-icon="mdi-file" class="ms-2" @click="descargarPDF"
          :disabled="filteredUsers.length === 0">
          Exportar PDF
        </v-btn>

      </v-col>
    </v-row>

    <v-row justify="center">
      <!-- Loader -->
      <template v-if="loading">
        <v-col cols="12" md="6" class="text-center">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
      </template>

      <!-- Error -->
      <template v-else-if="error">
        <v-col cols="12">
          <v-alert type="error" title="Error" text="Ocurrió un problema al cargar los usuarios" />
        </v-col>
      </template>


      <!-- Sin resultados -->
      <template v-else-if="filteredUsers.length === 0">
        <v-col cols="12">
          <v-sheet class="pa-6 text-center" color="transparent" elevation="0">
            <v-icon size="48" color="grey-darken-2" class="mb-2">mdi-account-off</v-icon>
            <div class="text-h6">No se encontraron usuarios</div>
            <p class="text-body-2 text-grey-darken-1">
              Ajusta tu búsqueda o filtros para ver resultados.
            </p>
          </v-sheet>
        </v-col>
      </template>

      <!-- Tarjetas -->
      <v-fade-transition group v-else>
        <v-col v-for="user in filteredUsers" :key="user.id" cols="12" sm="6" md="4">
          <UserCard :user="user" @view-details="handleViewDetails" />
        </v-col>
      </v-fade-transition>
    </v-row>

    <!-- Modal de detalles -->
    <UserModal v-model="showModal" :user="selectedUser" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getUsers, type User } from '@/services/UserService';
import UserCard from './UserCard.vue';
import UserModal from './UserModal.vue';
import SearchBar from './SearchBar.vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref(false);
const search = ref('');
const sortBy = ref<string | null>(null);

const sortOptions = [
  { title: 'Nombre (A-Z)', value: 'name_asc' },
  { title: 'Nombre (Z-A)', value: 'name_desc' },
  { title: 'Ciudad (A-Z)', value: 'city_asc' },
  { title: 'Ciudad (Z-A)', value: 'city_desc' },
  { title: 'Compañía (A-Z)', value: 'company_asc' },
  { title: 'Compañía (Z-A)', value: 'company_desc' },
];

const filters = ref<{ companies: string[]; cities: string[] }>({
  companies: [],
  cities: [],
});

const companies = computed(() =>
  [...new Set(users.value.map((u) => u.company.name))].sort()
);
const cities = computed(() =>
  [...new Set(users.value.map((u) => u.address.city))].sort()
);

const filteredUsers = computed(() => {
  const nameFilter = (search.value ?? '').toLowerCase();

  let result = users.value.filter((user) => {
    const matchName = user.name.toLowerCase().includes(nameFilter);
    const matchCompany =
      filters.value.companies.length === 0 || filters.value.companies.includes(user.company.name);
    const matchCity =
      filters.value.cities.length === 0 || filters.value.cities.includes(user.address.city);
    return matchName && matchCompany && matchCity;
  });

  if (sortBy.value) {
    const [field, direction] = sortBy.value.split('_');
    result.sort((a, b) => {
      const valA = field === 'name' ? a.name :
        field === 'city' ? a.address.city :
          a.company.name;
      const valB = field === 'name' ? b.name :
        field === 'city' ? b.address.city :
          b.company.name;

      return direction === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }

  return result;
});

const selectedUser = ref<User | null>(null);
const showModal = ref(false);

const handleViewDetails = (user: User) => {
  selectedUser.value = user;
  showModal.value = true;
};

function descargarCSV() {
  const encabezado = ['Nombre', 'Email', 'Teléfono', 'Ciudad', 'Compañía', 'Sitio Web'];
  const filas = filteredUsers.value.map(user => [
    user.name,
    user.email,
    user.phone,
    user.address.city,
    user.company.name,
    user.website,
  ]);

  const contenido = '\uFEFF' + [encabezado, ...filas]
    .map(fila => fila.map(celda => `"${celda}"`).join(','))
    .join('\n');


  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'lista_usuarios.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


function descargarPDF() {
  const doc = new jsPDF();
  const encabezado = ['Nombre', 'Email', 'Teléfono', 'Ciudad', 'Compañía', 'Sitio Web'];

  const filas = filteredUsers.value.map(user => [
    user.name,
    user.email,
    user.phone,
    user.address.city,
    user.company.name,
    user.website,
  ]);

  autoTable(doc, {
    head: [encabezado],
    body: filas,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [67, 160, 71], // Verde primario (#43A047)
      textColor: 255,
    },
    margin: { top: 20 },
  });

  doc.save('lista_usuarios.pdf');
}

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
