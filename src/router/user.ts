const User = () => import("../pages/user.vue");
export const userRoutes = [
    {
      name: "user",
      component: User,
      children: [],
      path: "/user",
      meta: { role: "user" },
    },
  ];