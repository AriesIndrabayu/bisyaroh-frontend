import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Search from "../pages/Search.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/tentang-kami", name: "About", component: About },
  { path: "/pencarian", name: "Search", component: Search },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
