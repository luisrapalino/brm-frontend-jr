import { createRouter, createWebHistory } from "vue-router";
import UserListView from "@/views/UserListView.vue";
import DashboardView from "@/views/DashboardView.vue";

const routes = [
  { path: "/", name: "Home", component: UserListView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
