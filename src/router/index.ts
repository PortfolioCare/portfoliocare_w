import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/examples",
    children: [
      {
        path: "trading",
        component: () => import("@/views/ChartingLibrary.vue"),
      },
      {
        path: "block",
        redirect: "/block/Authentication01",
        children: [
          {
            path: "Authentication01",
            component: () => import("@/components/block/Authentication01.vue"),
          },
          {
            path: "Authentication02",
            component: () => import("@/components/block/Authentication02.vue"),
          },
          {
            path: "Authentication03",
            component: () => import("@/components/block/Authentication03.vue"),
          },
          {
            path: "Authentication04",
            component: () => import("@/components/block/Authentication04.vue"),
          },
          {
            path: "Dashboard01",
            component: () => import("@/components/block/Dashboard01.vue"),
          },
          {
            path: "Dashboard02",
            component: () => import("@/components/block/Dashboard02.vue"),
          },
          {
            path: "Dashboard03",
            component: () => import("@/components/block/Dashboard03.vue"),
          },
          {
            path: "Dashboard04",
            component: () => import("@/components/block/Dashboard04.vue"),
          },
          {
            path: "Dashboard05",
            component: () => import("@/components/block/Dashboard05.vue"),
          },
          {
            path: "Dashboard06",
            component: () => import("@/components/block/Dashboard06.vue"),
          },
          {
            path: "Dashboard07",
            component: () => import("@/components/block/Dashboard07.vue"),
          },
        ],
      },
      {
        path: "examples",
        redirect: "/examples/mail",
        children: [
          {
            path: "mail",
            component: () => import("@/views/examples/mail/Example.vue"),
          },
          {
            path: "authentication",
            component: () => import("@/views/examples/authentication/Example.vue"),
          },
          {
            path: "cards",
            component: () => import("@/views/examples/cards/Example.vue"),
          },
          {
            path: "dashboard",
            component: () => import("@/views/examples/dashboard/Example.vue"),
          },
          {
            path: "forms",
            component: () => import("@/views/examples/forms/Example.vue"),
            redirect: "/examples/forms/Profile",
            children: [
              {
                path: "Profile",
                component: () => import("@/views/examples/forms/components/ProfileForm.vue"),
              },
              {
                path: "Account",
                component: () => import("@/views/examples/forms/components/AccountForm.vue"),
              },
              {
                path: "Appearance",
                component: () => import("@/views/examples/forms/components/AppearanceForm.vue"),
              },
              {
                path: "Notifications",
                component: () => import("@/views/examples/forms/components/NotificationsForm.vue"),
              },
              {
                path: "Display",
                component: () => import("@/views/examples/forms/components/DisplayForm.vue"),
              },
            ],
          },
          {
            path: "music",
            component: () => import("@/views/examples/music/Example.vue"),
          },
          {
            path: "playground",
            component: () => import("@/views/examples/playground/Example.vue"),
          },
          {
            path: "tasks",
            component: () => import("@/views/examples/tasks/Example.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
