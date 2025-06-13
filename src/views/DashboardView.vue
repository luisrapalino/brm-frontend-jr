<template>
  <UserDashboard :users="users" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, type User } from '@/services/UserService';
import UserDashboard from '@/components/UserDashboard.vue';

const users = ref<User[]>([]);

onMounted(async () => {
  users.value = await getUsers();
});
</script>
