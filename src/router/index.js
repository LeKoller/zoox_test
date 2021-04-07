import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
  },
  {
    path: "/create_state",
    name: "CreateState",
    component: () => import("../views/CreateState"),
  },
  {
    path: "/create_city",
    name: "CreateCity",
    component: () => import("../views/CreateCity"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
