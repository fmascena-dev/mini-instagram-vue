import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Feed from "../pages/Feed.vue";
import Favorites from "../pages/Favorites.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/feed", component: Feed },
  { path: "/favorites", component: Favorites }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
