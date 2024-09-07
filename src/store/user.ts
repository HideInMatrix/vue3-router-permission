import { defineStore } from "pinia";

export type Role = "admin" | "custom" | "user";

export const useUserRoleStore = defineStore("userInfo", {
  state: (): { role: Role } => ({
    role: "user",
  }),
  getters: {
    getRole: (state) => state.role,
  },
  actions: {
    changeRole(role: Role) {
      this.role = role;
    },
  },
  persist: {
    storage: window.localStorage,
  },
});
