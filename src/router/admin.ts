const Admin = () => import("../pages/admin.vue");
export const adminRoutes = [
    {
      name: "admin",
      component: Admin,
      children: [],
      path: "/admin",
      meta: { role: "admin" },
    },
  ];