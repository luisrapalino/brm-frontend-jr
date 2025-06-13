<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Mi App</v-app-bar-title>

      <v-spacer />
      <v-btn variant="text" to="/">Usuarios</v-btn>
      <v-btn variant="text" to="/dashboard">Dashboard</v-btn>
      <v-btn icon @click="toggleTheme" title="Cambiar tema">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="grey-darken-3" class="white--text text-center">
      <v-container>
        <span>&copy; {{ new Date().getFullYear() }} - BRM an alta company</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { onMounted } from "vue"

const theme = useTheme();

function toggleTheme() {
  const newTheme = theme.global.name.value === 'lightTheme' ? 'darkTheme' : 'lightTheme';
  theme.global.name.value = newTheme;
  localStorage.setItem('app-theme', newTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('app-theme');
  if (savedTheme === 'darkTheme' || savedTheme === 'lightTheme') {
    theme.global.name.value = savedTheme;
  }
}); 
</script>
