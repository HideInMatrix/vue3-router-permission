export const useUserStore = defineStore("user", {
    state: () => ({
        name: "",
        role: "",
        avatar: "",
        email: "",
    }),
});