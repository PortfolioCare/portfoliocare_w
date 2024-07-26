import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/mail",
    children: [
      {
        path: "mail",
        component: () => import("@/views/mail/Example.vue"),
      },
      {
        path: "authentication",
        component: () => import("@/views/authentication/Example.vue"),
      },
      {
        path: "cards",
        component: () => import("@/views/cards/Example.vue"),
      },
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/Example.vue"),
      },
      {
        path: "forms",
        component: () => import("@/views/forms/Example.vue"),
        redirect: "/forms/Profile",
        children: [
          {
            path: "Profile",
            component: () => import("@/views/forms/components/ProfileForm.vue"),
          },
          {
            path: "Account",
            component: () => import("@/views/forms/components/AccountForm.vue"),
          },
          {
            path: "Appearance",
            component: () => import("@/views/forms/components/AppearanceForm.vue"),
          },
          {
            path: "Notifications",
            component: () => import("@/views/forms/components/NotificationsForm.vue"),
          },
          {
            path: "Display",
            component: () => import("@/views/forms/components/DisplayForm.vue"),
          },
        ],
      },
      {
        path: "music",
        component: () => import("@/views/music/Example.vue"),
      },
      {
        path: "playground",
        component: () => import("@/views/playground/Example.vue"),
      },
      {
        path: "tasks",
        component: () => import("@/views/tasks/Example.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
