import { defineStore } from "pinia";
import { publicRoutes, privateRoutes } from "../router";
import { RouteRecordRaw } from "vue-router";

export const useRoutesStore = defineStore("routes", {
  state: () => ({
    routes: publicRoutes,
  }),

  actions: {
    setRoutes(newRoutes: RouteRecordRaw[]) {
      this.routes = [...publicRoutes, ...newRoutes];
    },
    filterRoutes(role: string) {
      this.routes = [
        ...publicRoutes,
        ...privateRoutes.filter((item) => item.meta.role === role),
      ];
      return this.routes;
    },
  },
  persist: {
    storage: localStorage,
  },
});
