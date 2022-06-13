import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export interface Module {
  routes?: RouteRecordRaw[];
  extend?: (app: App) => void;
}

export const bootstrap = (app: App, modules: Module[]): void => {
  const routes: RouteRecordRaw[] = [];

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];

    if (module.routes) {
      routes.push(...module.routes);
    }

    if (module.extend) {
      module.extend(app);
    }
  }

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  app.use(router);
  app.mount("#app");
};
