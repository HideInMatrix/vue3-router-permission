import { defineStore } from "pinia";

export type Role = "admin" | "custom" | "user";

export const useUserRoleStore = defineStore("userInfo", {
  state: (): { role: Role; name: string } => ({
    role: "user",
    name: "david",
  }),
  getters: {
    getRole: (state) => state.role,
  },
  actions: {
    changeRole(role: Role) {
      this.role = role;
    },
    changeName(name: string) {
      this.name = name;
    },
  },
  persist: {
    storage: window.localStorage,
  },
});
