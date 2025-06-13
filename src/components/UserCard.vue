<template>
  <v-card class="ma-2 pa-2" elevation="3" rounded="lg">
    <v-card-item>
      <template #prepend>
        <v-avatar size="56" class="me-3">
          <img :src="avatarUrl" :alt="user.name" />
        </v-avatar>
      </template>

      <v-card-title class="text-subtitle-1">{{ user.name }}</v-card-title>
      <v-card-subtitle class="text-caption text-grey">{{ user.email }}</v-card-subtitle>
    </v-card-item>

    <v-card-actions class="justify-end">
      <v-btn color="primary" variant="tonal" @click="$emit('view-details', user)">
        <v-icon start>mdi-eye</v-icon>
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { User } from '@/services/UserService';

const props = defineProps<{
  user: User;
}>();

const avatarUrl = `https://robohash.org/${encodeURIComponent(props.user.username)}.png?size=56x56&set=set3`;
</script>
