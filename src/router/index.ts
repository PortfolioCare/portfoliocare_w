import { createMemoryHistory, createRouter } from "vue-router";

const routes = [{ path: "/", component: () => import("@/views/mail/Example.vue") }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
