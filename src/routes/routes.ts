import Login from "@/pages/Login.vue";
import GeneralLayout from "@/pages/shared/GeneralLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { generalRoutes } from "./GeneralRoutes";
import Register from "@/pages/Register.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/general", component: GeneralLayout, children: generalRoutes },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
