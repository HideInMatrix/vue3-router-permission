
const Custom = () => import("../pages/custom.vue");
export const customRoutes = [
    {
      name: "custom",
      component: Custom,
      children: [],
      path: "/custom",
      meta: { role: "custom" },
    },
  ];