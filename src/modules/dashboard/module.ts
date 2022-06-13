import type { Module } from "@/lib/modules";

const dashboard: Module = {
  routes: [
    {
      path: "/",
      component: () =>
        import(
          /* webpackChunkName: "auth" */ "@/modules/dashboard/views/Dashboard.vue"
        ),
      children: [
        {
          name: "dashboard",
          path: "",
          component: () =>
            import(
              /* webpackChunkName: "auth" */ "@/modules/dashboard/views/DashboardIndex.vue"
            ),
        },
      ],
    },
  ],
};

export default dashboard;
